import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/chat/Chat';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/chat"
          element={user ? <Chat user={user} /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
