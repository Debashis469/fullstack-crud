import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";
import useLogout from "../hooks/useLogout.jsx";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    console.log("Logged out");
  };

  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaDumbbell className="navbar-icon" />
        <Link to="/" className="navbar-header">
          Workout Buddy
        </Link>
      </div>

      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <span style={{color: "#61dafb" , marginRight:"10px"}}>{user.email}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
