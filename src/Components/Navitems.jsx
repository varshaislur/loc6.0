import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { FiShoppingCart } from "react-icons/fi";
const Navitems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });
  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/signup" className="lab-btn me-3">
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <div className="logo">
                <Link to={"/"}>
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>
            {/* Menu */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/Shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/Store">Store</Link>
                  </li>
                  <li>
                    <Link to="/Contact">Contact us</Link>
                  </li>
                </ul>
              </div>
              <Link to="/sign-up" className="lab-btn me-3 d-none d-md-block">
                Create Account
              </Link>
              <Link to="/sign-up" className="d-none d-md-block">
                Login
              </Link>
              <div>
                <FiShoppingCart style={{ marginLeft: "20px" }} />
              </div>
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {/* sjs */}
            <div
              className="ellepsis-bar d-md-none"
              onClick={() => setSocialToggle(!socialToggle)}
            >
              <i className="iconfont-info-square"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navitems;
