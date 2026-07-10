import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import Navbar from "../navbar/Navbar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll(); // 👈 run once on mount
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <TipsAndUpdatesIcon />
            Project Tracker
          </Link>
        </div>
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="hamburger-menu-container">
          <div
            className="hamburger-menu"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={
              openSideMenu
                ? "hamburger-menu-list-container open-sidemenu"
                : "hamburger-menu-list-container"
            }
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
