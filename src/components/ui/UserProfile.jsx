import React, { useEffect, useRef, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/user";

const UserProfile = () => {
  const { current } = useUser();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Get name initials
  const getInitials = () => {
    const nameArr = current.name?.split(" ");
    const first = nameArr[0]?.charAt(0).toUpperCase();
    const second = nameArr[1]?.charAt(0).toUpperCase();
    return first + second;
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  // Open dropdown when click on outside
  useEffect(()=>{
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
          setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[])

  const logoutHandler = async () => {
    setLoading(true);
    const logouted = await user.logout();
    if (logouted) {
      navigate("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown profile-dropdown">
      <span className="user-profile-btn" onClick={toggleProfileDropdown}>
        {getInitials()}
      </span>
      {isProfileOpen && (
        <ul className="profile-dropdown-content">
          <li className="user-details-list">
            <span className="user-profile-btn">{getInitials()}</span>
            <div>
              <p className="user-details__name">{current.name}</p>
              <p class="user-details__email">{current.email}</p>
            </div>
          </li>
          <li className="user-menu-list">
            <Link to="/profile">Profile</Link>
            <Link to="/settigns">Setting</Link>
          </li>
          <li>
            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
