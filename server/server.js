const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { sequelize, Message, User } = require("./db.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080", // 設置你的客戶端來源域
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // 加入到對應的房間
  socket.on("join", async ({ userId, recipientId }) => {
    const roomId = getRoomId(userId, recipientId);
    socket.join(roomId);

    // 查詢所有與該用戶相關的消息
    const messages = await Message.findAll({
      where: {
        roomId,
      },
      order: [["createdAt", "DESC"]],
      limit: 25,
    });
    messages.reverse();

    // 發送歷史消息
    socket.emit("message", messages);
  });
  // 監聽到新的消息，保存到數據庫並廣播給房間內的所有用戶
  socket.on("message", async (roomId, message) => {
    await Message.create({ ...message, roomId });
    message.roomId = roomId;
    io.in(roomId).emit(`message`, [message]);
    //socket.emit(`message`, [message]);
    const clients = io.sockets.adapter.rooms.get(roomId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// 用戶註冊 API
app.post("/register", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.create({ username });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 用戶登入 API
app.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
function getRoomId(userId, recipientId) {
  return [userId, recipientId].sort().join("-");
}
