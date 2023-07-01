import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 改為 useNavigate
import axios from "axios"; // 引入 axios

const Login = ({ onLogin }) => {
  // 新增 onLogin 為 prop
  const [username, setUsername] = useState("user001");
  const [register, setRegister] = useState(false);
  const navigate = useNavigate(); // 改為 useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Username is required");
      return;
    }

    try {
      let response;

      if (register) {
        // 註冊新用戶
        response = await axios.post("http://localhost:3001/register", {
          username,
        });
      } else {
        // 登入現有用戶
        response = await axios.post("http://localhost:3001/login", {
          username,
        });
      }
      // 在成功登入或註冊後調用 onLogin
      onLogin(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/chat"); // 改為 navigate
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">{register ? "Register" : "Login"}</button>
        <button type="button" onClick={() => setRegister(!register)}>
          {register ? "Switch to Login" : "Switch to Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
