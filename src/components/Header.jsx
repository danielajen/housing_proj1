// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Header = ({ path, User }) => {
//   const [Toggle, setToggle] = useState("");
  
//   return (
//     <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
//     <div className="logo-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//   <Link to="/">
//     <img src="assets/logo.png" className="logo" alt="Glocal Foundation" style={{ width: "60px", height: "60px" }} />
//   </Link>
//   <Link to="/" style={{ textDecoration: "none" }}>
//     <div className="logo-text">
//       <h1 className="logo-header" style={{ color: "#3b82f6", fontSize: "28px", margin: 0 }}>Glocal Foundation</h1>
//       <p style={{ margin: 0, color: "#000" }}>Canada</p>
//     </div>
//   </Link>
// </div>


//       <div className="ham-btn">
//         {Toggle === "active" ? (
//           <i
//             className="fa fa-times"
//             onClick={() => {
//               setToggle("");
//             }}
//           ></i>
//         ) : (
//           <i
//             className="fa fa-solid fa-bars"
//             onClick={() => {
//               setToggle("active");
//             }}
//           ></i>
//         )}
//       </div>
//       <div
//         className={"header-links " + Toggle}
//         onClick={() => {
//           setToggle("");
//         }}
//       >
//         <ul className="scroll-auto" style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}>
//           <Link to="/" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/" ? "blue" : "", whiteSpace: "nowrap" }}>
//                 Home
//               </a>
//             </li>
//           </Link>
//           <Link to="/about" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/about" ? "blue" : "", whiteSpace: "nowrap" }}>
//                 About
//               </a>
//             </li>
//           </Link>
//           <Link to="/regional-affordability" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/regional-affordability" ? "blue" : "", whiteSpace: "nowrap" }}>
//                 Regional Affordability
//               </a>
//             </li>
//           </Link>
//           <Link to="/national-data" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/national-data" ? "blue" : "", whiteSpace: "nowrap" }}>
//                 National Housing Data
//               </a>
//             </li>
//           </Link>
//           <Link to="/policy-tracker" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/policy-tracker" ? "blue" : "", whiteSpace: "nowrap" }}>
//                 Housing Policy
//               </a>
//             </li>
//           </Link>
//           <Link to="/news" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/news" ? "blue" : "", fontWeight: "bold", whiteSpace: "nowrap" }}>
//                 News
//               </a>
//             </li>
//           </Link>
//           <Link to="/contact" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/contact" ? "blue" : "", whiteSpace: "nowrap" }}>
//                 Contact
//               </a>
//             </li>
//           </Link>
//           {/* <Link to="/login" className="w-[100%] lg:w-auto">
//             <li>
//               <a style={{ color: path === "/login" ? "red" : "" }}>
//                 <i className="fa fa-user" aria-hidden="true"></i>
//                 {User && User.username ? User.username : " Sign in"}
//               </a>
//             </li>
//           </Link> */}
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ path, User }) => {
  const [Toggle, setToggle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const linkStyle = (route) => ({
    color: path === route ? "#0d6efd" : "#000",
    fontWeight: path === route ? "bold" : "normal",
    whiteSpace: "nowrap",
    textDecoration: "none",
    display: "block",
    padding: "8px 0"
  });

  return (
    <header
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <Link to="/">
            <img
              src="assets/logo.png"
              className="logo"
              alt="Glocal Foundation"
              style={{ width: "60px", height: "60px" }}
            />
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div>
              <h1
                style={{
                  color: "#0d6efd",
                  fontSize: "24px",
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                Glocal Foundation
              </h1>
              <p style={{ margin: 0, color: "#000", fontSize: "14px" }}>
                Canada
              </p>
            </div>
          </Link>
        </div>

        {/* Hamburger Button - Only on mobile */}
        <div className="d-lg-none">
          {Toggle === "active" ? (
            <i
              className="fa fa-times"
              onClick={() => setToggle("")}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          ) : (
            <i
              className="fa fa-bars"
              onClick={() => setToggle("active")}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          )}
        </div>

        {/* Desktop Nav */}
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Link to="/" style={linkStyle("/")}>Home</Link>
          <Link to="/about" style={linkStyle("/about")}>About</Link>

          {/* Dropdown */}
          <div
            className="position-relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span style={{ ...linkStyle(""), cursor: "pointer" }}>
              House Data ▾
            </span>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "10px",
                  minWidth: "200px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  zIndex: 999,
                }}
              >
                <Link to="/national-housing-data" style={linkStyle("/national-housing-data")}>
                  National Housing
                </Link>
                <Link to="/regional-affordability" style={linkStyle("/regional-affordability")}>
                  Regional Affordability
                </Link>
                <Link to="/tenant-resources" style={linkStyle("/tenant-resources")}>
                  Tenant Resources
                </Link>
                <Link to="/indigenous-housing" style={linkStyle("/indigenous-housing")}>
                  Indigenous Housing
                </Link>
              </div>
            )}
          </div>

          <Link to="/news" style={linkStyle("/news")}>News</Link>
          <Link to="/housing-policy" style={linkStyle("/housing-policy")}>Housing Policy</Link>
          <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {Toggle === "active" && (
        <div className="d-lg-none mt-3">
          <Link to="/" style={linkStyle("/")}>Home</Link>
          <Link to="/about" style={linkStyle("/about")}>About</Link>
          <Link to="/national-housing-data" style={linkStyle("/national-housing-data")}>
            National Housing
          </Link>
          <Link to="/regional-affordability" style={linkStyle("/regional-affordability")}>
            Regional Affordability
          </Link>
          <Link to="/tenant-resources" style={linkStyle("/tenant-resources")}>
            Tenant Resources
          </Link>
          <Link to="/indigenous-housing" style={linkStyle("/indigenous-housing")}>
            Indigenous Housing
          </Link>
          <Link to="/news" style={linkStyle("/news")}>News</Link>
          <Link to="/housing-policy" style={linkStyle("/housing-policy")}>Housing Policy</Link>
          <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
