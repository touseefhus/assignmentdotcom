import ChatMessage from "../models/chat.models.js";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const newMessage = new ChatMessage({
      sender: senderId,
      receiver: receiverId,
      message: content,
    });

    await newMessage.save();

    res
      .status(200)
      .json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await ChatMessage.find({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(200).json({ data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await ChatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.read = true;
    await message.save();

    res.status(200).json({ message: "Message marked as read", data: message });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
