import type { Request, Response } from "express";
import { Router } from "express";
import { verifyToken } from "../middleware/tokenVerification";

const router = Router();

router.post("/login");
router.post("/notifications", verifyToken);
router.post("/notifications/:id/read", verifyToken);

router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
  });
});

export default router;
