import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../../lib/context/user";

// Import components
import UserProfile from "../ui/UserProfile";

function Navbar() {
  const user = useUser();

  const [shortName, setShortName] = useState("");
  const [showPrfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (user.current) {
      const nameArr = user.current.name?.split(" ");
      if (nameArr) {
        const shortNameVal = `${nameArr[0].charAt(0)}${nameArr[1].charAt(0)}`;
        setShortName(shortNameVal);
      }
    }
  }, [user]);

  return (
    <>
      <nav>
        <ul>
          <li className="nav-list">
            <Link to="/" className="nav-item nav-item-active">
              Home
            </Link>
          </li>
          <li className="nav-list">
            <a href="#features" className="nav-item">
              Features
            </a>
          </li>
          <li className="nav-list">
            <a href="#how-it-works" className="nav-item">
              How It Works
            </a>
          </li>
          <li className="nav-list" style={{display: "none"}}>
            <Link to="/ask-gpt" className="nav-item">
              Ask GPT
            </Link>
          </li>
          {user.current ? (
            <>
              <li className="nav-list">
                <Link to="/add-idea" className="nav-item">
                  Add Idea
                </Link>
              </li>
              <li className="nav-list" style={{position: "relative"}}>
                <span className="user-profile-btn" onClick={()=> setShowProfile(!showPrfile)}>{shortName}</span>
                {showPrfile && <UserProfile />}
              </li>
            </>
          ) : (
            <li className="nav-list">
              <Link to="/login" className="nav-item login-btn">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
