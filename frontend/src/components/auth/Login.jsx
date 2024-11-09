import React, { useState } from "react";
import axios from "../../axios";
import "./auth.css";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onCancel }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token in local storage
      navigate("/objects"); // Redirect to Object List Page
      console.log(response.data.msg);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="popup">
      <div className="inner-card">
        <h1>Welcome Back !</h1>
        <h4>please login to continue...</h4>
        <form className="form-styling space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-fields"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-fields"
          />
          {error && <p className="display-error">{error}</p>}
          <button type="submit" className="ui-btn ui-wb w-[360px]">
            <span>Login</span>
          </button>
          <button onClick={onCancel} className="ui-btn ui-wob">
            <span>Close</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
