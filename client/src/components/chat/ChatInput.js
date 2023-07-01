import React, { useState } from 'react';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
