const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT || 4500;

const users = [{}];

app.use(cors());
app.get("/", (req, res) => {
  res.send("HELL ITS WORKING");
});

const server = http.createServer(app);

const io = socketIO(server);

let messageId = 0; // Unique ID for each message

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("message", (newMessage) => {
    // Increment message ID and add likes
    messageId++;
    const messageWithId = { ...newMessage, id: messageId, likes: 0 };
    io.emit("sendMessage", messageWithId);
    console.log(messageWithId);
  });

  socket.on("like", ({ id, likes }) => {
    // Emit like count update only to the sender
    socket.emit("sendMessage", { id, likes });
  });

  socket.on("disconnect", () => {
    console.log(`user left`);
  });
});

server.listen(port, () => {
  console.log(`Working`);
});
