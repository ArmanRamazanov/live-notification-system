import express from "express";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket";
import router from "./routes/route";

const app = express();

app.use("/api", router);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

initializeSocket(io);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`The app is running on port: ${PORT}`);
});
