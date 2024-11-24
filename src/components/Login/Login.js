import { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  ///////
  console.log("Username:", username);
  console.log("Password:", password);
  // localStorage.clear(); // همه داده‌ها را از localStorage پاک می‌کند
  const accessToken = localStorage.getItem("accessToken");
  // اگر access token موجود بود، آن را لاگ بگیرد
  if (accessToken) {
    console.log("Access Token: ", accessToken);
  } else {
    console.log("No access token found");
  }
  ///////
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }
    try {
      await onLogin(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="login-form-control">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} //\\پرسیدن این بخش e
          />
        </div>
        <div className="login-form-control">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
