import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Top header with logo + auth buttons */}
      <header className="home-header">
        <div className="home-logo">✈ TRAVEL MANAGEMENT</div>
        <div className="home-header-actions">
          <Link to="/login" className="btn-header btn-login">Login</Link>
          <Link to="/signup" className="btn-header btn-signup">Sign Up</Link>
        </div>
      </header>

      {/* Hero content */}
      <div className="hero-content">
        <div className="hero-badge">🌍 Explore The World</div>
        <h1 className="hero-title">
          Your Journey <br />
          <span className="hero-highlight">Begins Here</span>
        </h1>
        <p className="hero-subtitle">
          Discover breathtaking destinations, handcrafted tour packages, and
          luxury stays — all in one place.
        </p>
        <div className="hero-cta-group">
          <Link to="/signup" className="cta-primary">Get Started</Link>
          <Link to="/login" className="cta-secondary">Sign In →</Link>
        </div>

        {/* Stats row */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Destinations</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">12K+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
