import React, { useState, useEffect } from "react";
import socketIo from "socket.io-client";
import Picker from "emoji-picker-react";
import "./Chat.css";
const userList = ["Alan", "Bob", "Carol", "Dean", "Elin"];
let socket;

const ENDPOINT = "http://localhost:4500/";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleMessageSend = () => {
    if (inputText.trim() !== "") {
      const randomUser = userList[Math.floor(Math.random() * userList.length)];
      const newMessage = {
        id: Date.now(), // Unique identifier for the message
        user: randomUser,
        text: inputText,
        likes: 0, // Initialize likes count to 0
      };
      socket.emit("message", newMessage);
      setInputText("");
    }
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Connected");
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => {
        // Update the message only if ID doesn't exist in the previous messages
        if (!prevMessages.find((msg) => msg.id === data.id)) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });
    });
    return () => {
      socket.off();
    };
  }, []);

  const handleLike = (id) => {
    setMessages((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            likes: message.likes + 1,
          };
        }
        return message;
      });
    });
    // Emit message with updated likes count
    socket.emit("like", {
      id: id,
      likes: messages.find((message) => message.id === id).likes + 1,
    });
  };

  const handleEmojiSelect = (emoji) => {
    setInputText(inputText + emoji.emoji); // Use emoji.emoji to get the selected emoji
  };
  return (
    <div className="chat-container">
      <div className="chat-thread">
        {messages
          .slice(0)
          .reverse()
          .map((message, index) => (
            <div key={index} className="chat-message">
              <div className="chat-circle">
                <span className="chat-circle-letter">{message.user[0]}</span>
                <span className="chat-circle-letter">
                  {message.user.slice(-1)}
                </span>
              </div>
              <span>
                {message.user}: {message.text}
              </span>
              <button
                className="like-button"
                onClick={() => handleLike(message.id)}
              >
                Like {message.likes}
              </button>
            </div>
          ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
        />
        <div
          className="emoji"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😀
        </div>
        {showEmojiPicker && (
          <div className="emoji-picker-react">
            {" "}
            <Picker theme="dark" width={345} onEmojiClick={handleEmojiSelect} />
          </div>
        )}
        <button className="send-btn" onClick={handleMessageSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
