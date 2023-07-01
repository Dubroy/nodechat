import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import Contacts from "./Contacts";
import axios from "axios";

// 將 user 添加為 prop
const Chat = ({ user }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState(null);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    // 從伺服器獲取用戶列表
    axios
      .get("http://localhost:3001/users") // 用你的 API 的完整 URL 替換
      .then((response) => {
        setUsers(response.data); // 將伺服器回應的用戶列表設定為 users 狀態
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []); // 當組件掛載時，取得用戶列表
  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:3001");
    setSocket(newSocket);

    const handleIncomingMessage = (message) => {
      console.log("Incoming message", message);
      message.forEach((input) => {
        const roomId = input.roomId;

        if (roomId === getRoomId(user.id, selectedUser.id)) {
          setMessages((messages) => [...messages, input]);
        }
      });
    };

    newSocket.on("message", handleIncomingMessage);

    return () => {
      newSocket.off("message", handleIncomingMessage);
      newSocket.close();
    };
  }, [roomId, user.id, selectedUser]);

  useEffect(() => {
    if (selectedUser && socket) {
      socket.emit("join", { userId: user.id, recipientId: selectedUser.id });
      setMessages([]);
    }
  }, [selectedUser, socket]);

  // 新增一個 useEffect
  useEffect(() => {
    if (selectedUser) {
      setRoomId(getRoomId(user.id, selectedUser.id)); // 將第二個 user.id 改為 selectedUser.id
    }
  }, [selectedUser]); // 每當 selectedUser 變化時，這個 useEffect 就會運行

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleNewMessage = (text) => {
    const message = {
      senderId: user.id, // 使用實際的用戶 ID
      recipientId: selectedUser.id,
      text,
    };

    const roomId = getRoomId(user.id, selectedUser.id);

    socket.emit("message", roomId, message);
  };

  return (
    <div className="chat" style={{ display: "flex" }}>
      {users && (
        <Contacts
          users={users}
          onUserClick={handleUserClick}
          style={{ flex: "1 0 auto" }}
        />
      )}
      {selectedUser && (
        <div style={{ flex: "2 0 auto" }}>
          <ChatHistory messages={messages} user={user} />
          <ChatInput onSubmit={handleNewMessage} />
        </div>
      )}
    </div>
  );
};
function getRoomId(userId, recipientId) {
  return [userId, recipientId].sort().join("-");
}

export default Chat;
