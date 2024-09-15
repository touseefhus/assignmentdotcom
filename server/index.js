import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./src/routes/customer.routes.js";
import reservationRoutes from "./src/routes/reservation.routes.js";
import chatRouter from "./src/routes/chat.routes.js";
import Message from "./src/models/chat.models.js"; // Import the Message model

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/customers", customerRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/chat", chatRouter);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Join chat room
  socket.on("join", async ({ senderId, receiverId }) => {
    if (senderId && receiverId) {
      const roomId = `chat_${Math.min(senderId, receiverId)}_${Math.max(
        senderId,
        receiverId
      )}`;
      console.log(
        `User ${senderId} joined chat with ${receiverId} in room ${roomId}`
      );
      socket.join(roomId);

      // Fetch and send chat history when a user joins
      const chatHistory = await Message.find({ roomId }).sort({ timestamp: 1 });
      socket.emit("chatHistory", chatHistory);
    }
  });

  // Listen for sendMessage event
  socket.on("sendMessage", async (message) => {
    const roomId = `chat_${Math.min(
      message.senderId,
      message.receiverId
    )}_${Math.max(message.senderId, message.receiverId)}`;

    // Save the message to the database
    const newMessage = new Message({
      senderId: message.senderId,
      receiverId: message.receiverId,
      message: message.message,
      roomId: roomId,
    });

    await newMessage.save(); // Save the message to MongoDB

    // Emit the message to the chat room
    io.to(roomId).emit("newMessage", message);
  });

  // Listen for disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
