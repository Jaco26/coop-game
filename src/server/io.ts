import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

interface MySocket extends Socket {
  username: string;
}

export const configureIO = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:8080",
    },
  });

  io.use((socket, next) => {
    const mySocket = socket as MySocket;
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("Invalid username"));
    }
    mySocket.username = username;
    next();
  });

  io.on("connection", (socket) => {
    const users = [];
    for (const [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        username: (socket as MySocket).username,
      });
    }
    socket.emit("users", users);
    socket.broadcast.emit("user connected", {
      userId: socket.id,
      username: (socket as MySocket).username,
    });
  });
};
