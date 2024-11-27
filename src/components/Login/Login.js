// import { useContext } from "react";
// import { AuthContext } from "../../services/AuthContext";
import { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  ///////LOGGG
  console.log("Username: ", username);
  console.log("Password: ", password);

  const accessToken = localStorage.getItem("accessToken");
  // localStorage.clear(); // همه داده‌ها را از localStorage پاک می‌کند
  //  اگر access token موجود بود، آن را لاگ بگیرد
  // const { handleLogin } = useContext(AuthContext);
  // const handleSubmit = async (username, password) => {
  //   try {
  //     const token = await api.loginToServer(username, password); // دریافت توکن از سرور
  //     handleLogin(token); // ذخیره توکن در Context
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  if (accessToken) {
    console.log("Access Token in Login: ", accessToken);
  } else {
    console.log("No access token found");
  }
  ///////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }
    try {
      await onLogin(username, password);
      // console.log("Login successful, token:", token);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error.message);
      // alert("Invalid username or password. Please try again.");
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
