import jwt from "jsonwebtoken";

export interface tokenPayload extends jwt.JwtPayload {
  userId: string;
}

export function isTokenPayload(payload: unknown): payload is tokenPayload {
  return typeof payload === "object" && payload !== null && "userId" in payload;
}
