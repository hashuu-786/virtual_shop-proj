import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by retrieving user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.firstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#1a1a1a",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left - Logo */}
      <Link
        to="/home"
        style={{
          textDecoration: "none",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        🛒 Virtual Shop
      </Link>

      {/* Center - Navigation Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Link
          to="/products"
          style={{
            fontWeight: "bold",
            color: "#ddd",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#333")}
          onMouseOut={(e) => (e.target.style.background = "transparent")}
        >
          Products
        </Link>
        <Link
          to="/cart"
          style={{
            fontWeight: "bold",
            color: "#ddd",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#333")}
          onMouseOut={(e) => (e.target.style.background = "transparent")}
        >
          Cart 🛍️
        </Link>
        <Link
          to="/assistant"
          style={{
            fontWeight: "bold",
            color: "#ddd",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#333")}
          onMouseOut={(e) => (e.target.style.background = "transparent")}
        >
          AI Assistant 🤖
        </Link>
      </div>

      {/* Right - Profile & Logout (If Logged In) or Login/Register (If Not Logged In) */}
      {isLoggedIn ? (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: "#fff", fontWeight: "bold" }}>👤 {userName}</span>
          <Link to="/profile">
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px 14px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0056b3")}
              onMouseOut={(e) => (e.target.style.background = "#007bff")}
            >
              My Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 14px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "darkred")}
            onMouseOut={(e) => (e.target.style.background = "red")}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/login">
            <button
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                border: "1px solid #fff",
                padding: "8px 14px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#fff";
              }}
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "8px 14px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#1e7e34")}
              onMouseOut={(e) => (e.target.style.background = "#28a745")}
            >
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
