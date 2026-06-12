import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/TravelApi";
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/public/login", { email, password });
      const { token, id, email: userEmail, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("email", userEmail);

      setUser({ token, role, userId: id, email: userEmail });

      if (role === "ADMIN") {
        navigate("/api/admin/dashboard");
      } else {
        navigate("/api/user/book");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2 style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p style={{ color: "red", textAlign: "center", fontSize: "14px", margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit">Login</button>

        <p style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
