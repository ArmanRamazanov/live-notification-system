import { UserModel } from "../models/User";
import jwt from "jsonwebtoken";
import customError from "../utils/customError";
import { NotificationModel } from "../models/Notification";
import { getIO } from "../socket/socket";

const io = getIO();

export async function loginService(username: string) {
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new customError(404, "The user was not found");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET!,
    );

    return { token, user: { id: user._id, username: user.username } };
  } catch (err) {
    throw err;
  }
}

export async function notificationService(input: {
  userId: string;
  type: "INFO" | "SYSTEM" | "WARNING" | "ORDER";
  title: string;
  body: string;
}) {
  try {
    const { userId, type, title, body } = input;
    const notification = await NotificationModel.create({
      userId,
      type,
      title,
      body,
    });

    io.emit("notify-user", notification.toObject());
    return notification;
  } catch (err) {
    throw err;
  }
}

export async function getNotifications(
  userId: string,
  limit: string | undefined,
  unreadOnly: string | undefined,
) {
  try {
    let limitParsed: number = 20;
    let unreadOnlyParsed: boolean = false;
    let dbQuery: { userId: string; read?: boolean } = { userId };
    if (limit) {
      limitParsed = parseInt(limit, 10);
    }
    if (unreadOnly !== undefined) {
      unreadOnlyParsed = Boolean(unreadOnly);
    }
    if (unreadOnlyParsed) {
      dbQuery["read"] = false;
    }
    const notifications =
      await NotificationModel.find(dbQuery).limit(limitParsed);

    return notifications;
  } catch (err) {
    throw err;
  }
}

export async function readNotification(userId: string, notificationId: string) {
  try {
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
      throw new customError(404, "The notification was not found");
    }

    if (notification.userId.toString() !== userId) {
      throw new customError(
        403,
        "The user does not have an access to the notification",
      );
    }

    notification.read = true;
    await notification.save();
    return true;
  } catch (err) {
    throw err;
  }
}
