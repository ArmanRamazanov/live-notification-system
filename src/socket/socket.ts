import { Server } from "socket.io";
import { socketAuth } from "../middleware/socketAuth";

let io: Server;

export function initializeSocket(socketServer: Server) {
  io = socketServer;

  socketAuth(io);

  io.on("connection", (socket) => {
    console.log("The user has connected");
  });
}

export function getIO() {
  return io;
}
