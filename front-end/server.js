import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

app.use(cors());

// ✅ Add this route to handle HTTP requests
app.get("/", (req, res) => {
  res.send("Server is running...");
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("callUser", (signalData) => {
    io.emit("callAccepted", signalData);
  });

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
