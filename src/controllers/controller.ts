import type { Request, Response, NextFunction } from "express";
import {
  getNotifications,
  loginService,
  notificationService,
  readNotification,
} from "../services/service";
import customError from "../utils/customError";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username } = req.body;

    if (!username) {
      res
        .status(400)
        .json({ success: false, message: "The username is required" });
      return;
    }

    const result = await loginService(username);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function notificationController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "The user is not authenticated",
      });
    }

    const notification = await notificationService({
      userId,
      type: "INFO",
      title: "Title",
      body: "This is your notification",
    });

    res.json({
      success: true,
      data: notification,
    });
  } catch (err) {
    next(err);
  }
}

export async function getNotificationsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { limit, unreadOnly } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "The user is not authenticated",
      });
    }

    if (typeof limit !== "string" || limit !== undefined) {
      return res.status(400).json({
        success: false,
        message: "The limit query must be string if provided",
      });
    }
    if (typeof unreadOnly !== "string" || unreadOnly !== undefined) {
      return res.status(400).json({
        success: false,
        message: "The unreadOnly must be string if provided",
      });
    }

    const notifications = await getNotifications(userId, limit, unreadOnly);

    res.json({
      success: true,
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
}

export async function readNotificationController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "The user is not authenticated",
      });
    }

    const response = await readNotification(userId, id);

    if (response) {
      res.json({
        success: true,
        data: null,
      });
    } else {
      throw new customError(500, "Something went wrong");
    }
  } catch (err) {
    next(err);
  }
}
