import React, { useState } from 'react';
import './Contacts.css';

const Contacts = ({ users, onUserClick }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    onUserClick(user);
  };

  return (
    <div className="contacts">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => handleUserClick(user)}
          className={`contact ${user === selectedUser ? 'selected' : ''}`}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default Contacts;
