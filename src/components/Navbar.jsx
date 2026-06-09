import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/TravelApi";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    try {
      await api.post("/logout");
    } catch (err) {
      console.log("Session logout request error (expected if already logged out)");
    }
    localStorage.clear();
    if (setUser) {
      setUser(null);
    }
    navigate("/");
  };

  return (
    <nav className="sidebar-nav">
      <div className="logo">TRAVEL MANAGEMENT</div>
      <div className="nav-links">
        {user ? (
          <>
            {user.role === "ADMIN" ? (
              <>
                <NavLink 
                  to="/api/admin/dashboard" 
                  className={({ isActive }) => isActive ? "active-link" : ""}
                >
                  ADD TOUR
                </NavLink>
                <NavLink 
                  to="/api/admin/bookings" 
                  className={({ isActive }) => isActive ? "active-link" : ""}
                >
                  CUSTOMER BOOKINGS
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/api/user/book" 
                  className={({ isActive }) => isActive ? "active-link" : ""}
                >
                  BOOK TOUR
                </NavLink>
                <NavLink 
                  to="/api/user/packages" 
                  className={({ isActive }) => isActive ? "active-link" : ""}
                >
                  AVAILABLE PACKAGES
                </NavLink>
                <NavLink 
                  to={`/api/user/bookings/${user.userId}`} 
                  className={({ isActive }) => isActive ? "active-link" : ""}
                >
                  MY BOOKINGS
                </NavLink>
              </>
            )}
            <button type="button" className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              HOME
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              LOGIN
            </NavLink>
            <NavLink 
              to="/signup" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              SIGNUP
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
