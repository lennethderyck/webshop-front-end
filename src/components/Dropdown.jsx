import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/dropdown.css";
import { Link } from "react-router-dom";
import { logout } from "../context/userActions";

export default function Dropdown({ dropdown, onDarkMode = (f) => f }) {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [darkMode, setDarkMode] = useState(true);

  //Sets the admin state to true or false
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      if (userInfo.user.roles.includes("admin")) {
        setAdmin(true);
      }
    } else {
      setAdmin(false);
    }
  }, [setAdmin, userInfo]);

  //Log a user out
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  //Sets the darkmode to 'ligh' or 'dark'
  // -> This work is still in progress
  const handleDarkMode = useCallback(() => {
    onDarkMode(darkMode);
    setDarkMode(!darkMode);
  }, [darkMode, onDarkMode]);

  //Gives a dropdown menu from the navbar
  return (
    <>
      <ul
        className={
          dropdown
            ? darkMode
              ? "menu-dropdown active"
              : "menu-dropdown active dark"
            : "menu-dropdown"
        }
      >
        <li
          className={
            darkMode ? "dropdown-link-name" : "dropdown-link-name dark-link"
          }
          key={"0"}
        >
          {localStorage.getItem("userInfo")
            ? userInfo.user.name.split(" ")[0]
            : ""}
        </li>
        <li>
          <Link
            className={darkMode ? "dropdown-link" : "dropdown-link dark-link"}
            to="/myorders"
          >
            <i className="fas fa-shopping-basket"></i> My Orders
          </Link>
        </li>
        <li>
          <Link
            className={darkMode ? "dropdown-link" : "dropdown-link dark-link"}
            to="/settings"
          >
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
        {admin && (
          <li>
            <Link
              className={darkMode ? "dropdown-link" : "dropdown-link dark-link"}
              to="/admin"
            >
              <i className="fas fa-key"></i> Admin
            </Link>
          </li>
        )}
        <li className="link-darkMode">
          <div className="tumbler__wrapper" onClick={handleDarkMode}>
            <div
              className={darkMode ? "tumbler tumbler-dark" : "tumbler"}
            ></div>
            <i className={"far fa-sun"}></i>
            <i className={"fas fa-moon"}></i>
          </div>
        </li>
        <li>
          <Link
            className={darkMode ? "dropdown-link" : "dropdown-link dark-link"}
            to="/signIn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </li>
      </ul>
    </>
  );
}
