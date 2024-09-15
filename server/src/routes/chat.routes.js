// routes/chatRoutes.js
import express from "express";
import {
  sendMessage,
  getMessages,
  markAsRead,
} from "../contollers/chat.controller.js";

const chatRouter = express.Router();

// Route to send a message
chatRouter.post("/send", sendMessage);

// Route to get messages between two users
chatRouter.get("/:senderId/:receiverId", getMessages);

// Route to mark a message as read
chatRouter.put("/read/:messageId", markAsRead);

export default chatRouter;
