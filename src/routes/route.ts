import type { Request, Response } from "express";
import { Router } from "express";
import { verifyToken } from "../middleware/tokenVerification";
import {
  getNotificationsController,
  loginController,
  notificationController,
  readNotificationController,
} from "../controllers/controller";

const router = Router();

router.post("/login", loginController);
router.post("/notifications", verifyToken, notificationController);
router.patch(
  "/notifications/:id/read",
  verifyToken,
  readNotificationController,
);
router.get("/notifications", verifyToken, getNotificationsController);

router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
  });
});

export default router;
