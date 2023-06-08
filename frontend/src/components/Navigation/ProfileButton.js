import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import menuIcon from "../../assets/hamburgerMenu.png";
import { Link, useHistory } from "react-router-dom";
import "./ProfileButton.css"
import profileIcon from "../../assets/profileIcon.png";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutThunk());
    setShowMenu(false);
    history.push("/");
  };

  document.addEventListener("click", () => setShowMenu(false));

  const menuDropDownClassName = "menu-wrapper" + (showMenu ? "" : " hidden");

  return (
    <div id="profile-button-container" onClick={(e) =>{
      e.stopPropagation() 
      setShowMenu(!showMenu)
    }}>
      <div id="menu-container">
        <img id="menu-icon" src={menuIcon} alt="menu-icon" />
        <img id="profile-icon" src={profileIcon} alt="profile-button" />
      </div>
      <ul className={menuDropDownClassName} id="logged-in-user-menu" >
        {user ? (
          <>
            <li className="user-info" onClick={(e) => e.stopPropagation()} >{`Hello, ${user.firstName}`}</li>
            <li className="user-info" onClick={(e) => e.stopPropagation()} >{user.email}</li>
            <li id="manage-spot-link">
              <Link to="/currentUser/locations">Manage Spots</Link>
            </li>
            <li id="manage-reviews-link">
              <Link to="/currentUser/reviews">Manage Reviews</Link>
            </li>
            <li id="logout-container" onClick={(e) => e.stopPropagation()}>
              <button id="logout-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <div onClick={(e) => e.stopPropagation()} id="login-signup-container">
            <li id="login-button-wrapper">
              <LoginFormModal />
            </li>
            <li id="signup-button-wrapper">
              <SignupFormModal />
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
