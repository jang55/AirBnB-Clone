import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
// import SignupFormModal from "../SignupFormModal";
// import DemoLoginButton from "./DemoLoginButton";
import logo from "../../assets/logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.sessionState.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = <ProfileButton user={sessionUser} />;
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //       <DemoLoginButton />
  //     </>
  //   );
  // }
  return (
    <nav className="navbar">
      <NavLink exact to="/">
        <img id="logo" src={logo} alt="logo"/>
      </NavLink>
      <div id="right-side-nav">
        <ul id="nav-link-container">
          <li>
            <NavLink style={{ color: "#096246" }} to="/locations/new">
              Create a New Spot
            </NavLink>
          </li>
        </ul>

        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;
