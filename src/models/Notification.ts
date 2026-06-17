import mongoose, { Schema } from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["INFO", "WARNING", "ORDER", "SYSTEM"],
      default: "INFO",
    },
    title: {
      type: String,
      required: true,
    },
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema,
);
