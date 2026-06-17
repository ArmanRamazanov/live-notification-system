import { Server } from "socket.io";
import customError from "../utils/customError";
import jwt from "jsonwebtoken";
import { isTokenPayload } from "../utils/isTokenPayload";

export function socketAuth(server: Server) {
  server.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new customError(401, "The user is not authenticated"));
    }

    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

      if (!isTokenPayload(payload)) {
        return next(new customError(401, "The user is not authenticated"));
      }

      const userId = payload.userid;

      socket.data.userId = userId;
    } catch {
      return next(new customError(401, "The token is invalid or expired"));
    }
  });
}
