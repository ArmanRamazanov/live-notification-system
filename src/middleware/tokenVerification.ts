import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { isTokenPayload } from "../utils/isTokenPayload";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "The user is not authenticated",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (!isTokenPayload(payload)) {
      return res.status(401).json({
        success: false,
        message: "The user is not authenticated",
      });
    }

    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "The token is invalid",
    });
  }
}
