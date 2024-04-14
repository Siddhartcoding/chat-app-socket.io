import React from "react";
import { username } from "../join/Join";
import "./Chat.css";
import socketIo from "socket.io-client";

const ENDPOINT = "http://localhost:4500";

const Chat = () => {
  const socket = socketIo(ENDPOINT, { transports: [`websoket`] });
  socket.on(`connect`, () => {
    alert("connected");
  });
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"> {username}</div>
        <div className="chatBox"></div>
        <div className="inputBox"></div>
      </div>
    </div>
  );
};

export default Chat;
