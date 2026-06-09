import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/TravelApi";
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const checkActiveSession = async () => {
      try {
        const res = await api.get("/user/me");
        if (res.data && res.data.email) {
          const { email, role, id } = res.data;
          
          localStorage.setItem("email", email);
          localStorage.setItem("role", role);
          localStorage.setItem("userId", id);

          if (setUser) {
            setUser({ email, role, userId: id });
          }

          if (role === "ADMIN") {
            navigate("/api/admin/dashboard");
          } else {
            navigate("/api/user/book");
          }
        }
      } catch (err) {
        // No active session
      }
    };
    checkActiveSession();
  }, [navigate, setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const basicToken = "Basic " + btoa(email + ":" + password);

      // Verify credentials and retrieve user info directly from /user/me
      const res = await api.get("/user/me", {
        headers: { Authorization: basicToken }
      });

      const { email: backendEmail, role, id: userId } = res.data;

      if (!backendEmail) {
        throw new Error("No user details returned");
      }

      localStorage.setItem("token", basicToken);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", backendEmail);

      if (setUser) {
        setUser({
          token: basicToken,
          role: role,
          userId: userId,
          email: backendEmail
        });
      }

      if (role === "ADMIN") {
        navigate("/api/admin/dashboard");
      } else {
        navigate("/api/user/book");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  const handleOAuthLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.trim()) {
      setError("Please enter your email in the Email field first to log in with Google.");
      return;
    }

    // Redirect directly to the backend Google OAuth2 authorization endpoint on port 8081 with login_hint parameter
    window.location.href = `http://localhost:8081/oauth2/authorization/google?login_hint=${encodeURIComponent(email.trim())}`;
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

        <button type="submit">Login</button>

        {error && <p style={{ color: "red", marginTop: "5px", textAlign: "center", fontSize: "14px" }}>{error}</p>}

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "5px 0", color: "#aaa" }}>
          <hr style={{ flex: 1, border: "0.5px solid #444" }} />
          <span style={{ padding: "0 10px", fontSize: "14px" }}>OR</span>
          <hr style={{ flex: 1, border: "0.5px solid #444" }} />
        </div>

        {/* Google Login Button */}
        <button 
          type="button" 
          onClick={handleOAuthLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s ease",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign In with Google
        </button>

        <p style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
