import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Chat.css"; // Import the styles

const Chat = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:9000");

  useEffect(() => {
    if (senderId && receiverId) {
      const roomId = `chat_${Math.min(senderId, receiverId)}_${Math.max(
        senderId,
        receiverId
      )}`;
      console.log(`Joining room: ${roomId}`);
      socket.emit("join", { senderId, receiverId });
    }

    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("chatHistory", (chatHistory) => {
      setMessages(chatHistory);
    });

    return () => {
      socket.disconnect();
    };
  }, [senderId, receiverId, socket]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        senderId,
        receiverId,
        message,
        timestamp: new Date(),
      };
      socket.emit("sendMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h3 className="chat-header">Chat</h3>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === senderId ? "you" : "them"}`}
          >
            <strong>{msg.senderId === senderId ? "You" : "Them"}: </strong>
            {msg.message}
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
