import React, { useContext, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import "../styles/navbar.css";

import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { NavDropdown, TabPane } from "react-bootstrap";
import { LoginContext } from "../LoginContext";

const Navbar = () => {
  const isLoggedin = localStorage.getItem("isLoggedin");
  const userType = localStorage.getItem("UserType");
  const storedUser = localStorage.getItem("userinfo");
  const navigate = useNavigate();
  const authContext = useContext(LoginContext)

  let userinfo: { username: string } | null = null;

  if (storedUser !== null) {
    userinfo = JSON.parse(storedUser);
    console.log(userinfo, "User info retrieved");
  }

  const logoutHandler = () => {
    console.log("loggedout");
    window.localStorage.clear();
    authContext?.setIsLoggedIn(false)
    authContext?.setUserType(null)
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        {!isLoggedin && <Link to="/login">Login</Link>}
        {userType === "admin" && <Link to="/admin-dashboard">Dashboard</Link>}
        {userType === "user" && <Link to="/user">User</Link>}
      </div>

      <div className="navbar-right">
        <div className="username">{userinfo?.username}</div>
        {isLoggedin && <Link to="/" onClick={logoutHandler}>Logout</Link>}
      </div>
      <Outlet/>
    </div>
  
  );
};

export default Navbar;
