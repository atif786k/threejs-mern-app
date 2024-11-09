import React, { useState } from "react";
import axios from "../../axios";
import "./auth.css";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onCancel }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token in local storage
      console.log(response.data.msg);
      navigate("/objects"); // Redirect to Object List Page
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="popup">
      <div className="inner-card">
        <h1>Create an account</h1>
        <h4></h4>
        <form className="form-styling space-y-2" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-fields"
          />
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
            <span>Sign Up</span>
          </button>
          <button onClick={onCancel} className="ui-btn ui-wob">
            <span>Close</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;