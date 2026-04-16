import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../../lib/context/user";

// Import components
import UserProfile from "../ui/UserProfile";

function Navbar() {
  const { current } = useUser();

  return (
    <>
      <nav>
        <ul>
          {current ? (
            <>
              <li className="nav-list">
                <Link to="/" className="nav-item nav-item-active">
                  Home
                </Link>
              </li>
              <li className="nav-list">
                <Link to="/project/new" className="nav-item">
                  Add Project
                </Link>
              </li>
              <li className="nav-list">
                <Link to="/projects" className="nav-item">
                  My Projects
                </Link>
              </li>
              <li className="nav-list">
                <Link to="/assistant" className="nav-item">
                  Assistant
                </Link>
              </li>
              <li className="nav-list" style={{ position: "relative" }}>
                <UserProfile />
              </li>
            </>
          ) : (
            <>
              <li className="nav-list">
                <Link to="/login" className="nav-item login-btn">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
