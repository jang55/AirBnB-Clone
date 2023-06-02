import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
// import SignupFormModal from "../SignupFormModal";
// import DemoLoginButton from "./DemoLoginButton";

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
        Home
      </NavLink>
      <NavLink to="/locations/new">
        Create A Spot
      </NavLink>
      <ul>
        <li>{isLoaded && <ProfileButton user={sessionUser} />}</li>
      </ul>
    </nav>
  );
}

export default Navigation;
