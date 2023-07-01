import React, { useRef, useEffect } from "react";
import "./ChatHistory.css";

const ChatHistory = ({ messages, user }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <p
          key={index}
          className={
            message.senderId === user.id ? "message-right" : "message-left"
          }
        >
          {message.text}
        </p>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatHistory;
