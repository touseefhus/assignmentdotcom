import { Server } from "socket.io"; // Use named import
import http from "http";
import express from "express";

// Your other imports and configurations...

const app = express();
const server = http.createServer(app); // Create an HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from your frontend
  },
});

// Your socket.io configuration
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", ({ senderId, receiverId }) => {
    console.log(`User ${senderId} joined chat with ${receiverId}`);
    socket.join(`chat_${senderId}_${receiverId}`);
  });

  socket.on("sendMessage", (message) => {
    io.to(`chat_${message.senderId}_${message.receiverId}`).emit(
      "newMessage",
      message
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Server setup
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
