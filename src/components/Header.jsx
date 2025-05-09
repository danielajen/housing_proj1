import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ path, User }) => {
  const [Toggle, setToggle] = useState("");
  
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
    <div className="logo-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <Link to="/">
    <img src="assets/ribbon.png" className="logo" alt="Glocal Foundation" style={{ width: "60px", height: "60px" }} />
  </Link>
  <Link to="/" style={{ textDecoration: "none" }}>
    <div className="logo-text">
      <h1 className="logo-header" style={{ color: "#3b82f6", fontSize: "28px", margin: 0 }}>Glocal Foundation</h1>
      <p style={{ margin: 0, color: "#000" }}>Canada</p>
    </div>
  </Link>
</div>


      <div className="ham-btn">
        {Toggle === "active" ? (
          <i
            className="fa fa-times"
            onClick={() => {
              setToggle("");
            }}
          ></i>
        ) : (
          <i
            className="fa fa-solid fa-bars"
            onClick={() => {
              setToggle("active");
            }}
          ></i>
        )}
      </div>
      <div
        className={"header-links " + Toggle}
        onClick={() => {
          setToggle("");
        }}
      >
        <ul className="scroll-auto" style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}>
          <Link to="/" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/" ? "blue" : "", whiteSpace: "nowrap" }}>
                Home
              </a>
            </li>
          </Link>
          <Link to="/about" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/about" ? "blue" : "", whiteSpace: "nowrap" }}>
                About
              </a>
            </li>
          </Link>
          <Link to="/regional-affordability" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/regional-affordability" ? "blue" : "", whiteSpace: "nowrap" }}>
                Regional Affordability
              </a>
            </li>
          </Link>
          <Link to="/national-data" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/national-data" ? "blue" : "", whiteSpace: "nowrap" }}>
                National Housing Data
              </a>
            </li>
          </Link>
          <Link to="/policy-tracker" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/policy-tracker" ? "blue" : "", whiteSpace: "nowrap" }}>
                Housing Policy
              </a>
            </li>
          </Link>
          <Link to="/news" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/news" ? "blue" : "", fontWeight: "bold", whiteSpace: "nowrap" }}>
                News
              </a>
            </li>
          </Link>
          <Link to="/contact" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/contact" ? "blue" : "", whiteSpace: "nowrap" }}>
                Contact
              </a>
            </li>
          </Link>
          {/* <Link to="/login" className="w-[100%] lg:w-auto">
            <li>
              <a style={{ color: path === "/login" ? "red" : "" }}>
                <i className="fa fa-user" aria-hidden="true"></i>
                {User && User.username ? User.username : " Sign in"}
              </a>
            </li>
          </Link> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;