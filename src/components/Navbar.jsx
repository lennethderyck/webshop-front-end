import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import "../css/navbar.css";
import Dropdown from "./Dropdown";

export default function Navbar({ onDarkMode = (f) => f, theme }) {
  const [click, setClick] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [navbar, setNavbar] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = useCallback(() => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  }, [setDropdown, dropdown]);

  //Triggers the dropdown menu when the mouse enters
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  //Triggers the dropdown menu when the mouse leaves
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const [user, setUser] = useState(Boolean(localStorage.getItem("auth_token")));

  //Sets user on true when someone is logged in
  useEffect(() => {
    setUser(Boolean(localStorage.getItem("auth_token")));
  }, [user, userInfo]);

  //Sets navbar on true, for styling reasons only
  const changeNavbar = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const handleClick = useCallback(() => {
    setClick(!click);
  }, [setClick, click]);

  //Shows a navbar at the top of the screen
  return (
    <>
      <nav className={navbar ? "navbar on" : "navbar"}>
        <div className="nav-container">
          <NavLink
            exact
            to="/"
            className={theme ? "nav-logo dark" : "nav-logo"}
          >
            Noëlla
          </NavLink>
          <ul
            className={
              click
                ? theme
                  ? "nav-menu active dark"
                  : "nav-menu active"
                : "nav-menu"
            }
          >
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className={theme ? "nav-links dark" : "nav-links"}
                activeClassName="item-active"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/products"
                activeClassName="item-active"
                className={theme ? "nav-links dark" : "nav-links"}
                onClick={handleClick}
              >
                Paintings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="item-active"
                className={theme ? "nav-links dark" : "nav-links"}
                onClick={handleClick}
              >
                Contact Me
              </NavLink>
            </li>
          </ul>
          <div
            className={theme ? "nav-icon dark" : "nav-icon"}
            onClick={handleClick}
          >
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          {user && (
            <>
              <div className="nav-item-user" onMouseLeave={onMouseLeave}>
                <div
                  className={theme ? "nav-links-user dark" : "nav-links-user"}
                  onClick={closeMobileMenu}
                  onMouseEnter={onMouseEnter}
                >
                  <i className="fas fa-user"></i>
                </div>
                {<Dropdown dropdown={dropdown} onDarkMode={onDarkMode} />}
              </div>
            </>
          )}
          {user && (
            <div className="nav-item-cart">
              <NavLink
                exact
                to="/order"
                activeClassName="active"
                className={theme ? "nav-links dark" : "nav-links"}
              >
                <i className="fas fa-shopping-cart"></i>
              </NavLink>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </div>
          )}
          {!user && (
            <NavLink
              exact
              to="/signIn"
              activeClassName="active"
              className="nav-SignIn"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}
