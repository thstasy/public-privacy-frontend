// import React, { useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import '../../src/App.css'
// import AuthContext from "../components/shared/AuthContext.js"; 

// const Navbar = () => {

//   const { isAuthenticated } = useContext(AuthContext);

//   const [showOpinionsDropdown, setShowOpinionsDropdown] = useState(false);
//   const [showCollaboratorsDropdown, setShowCollaboratorsDropdown] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const toggleOpinionsDropdown = (event) => {
//     event.stopPropagation(); 
//     setShowOpinionsDropdown(!showOpinionsDropdown);
//   };

//   const toggleCollaboratorsDropdown = (event) => {
//     event.stopPropagation(); 
//     setShowCollaboratorsDropdown(!showCollaboratorsDropdown);
//   };

//   const closeDropdown = () => {
//     setShowOpinionsDropdown(false);
//     setShowCollaboratorsDropdown(false);
//   };

//   useEffect(() => {
//     const handleWindowResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleWindowResize);

//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);

//   useEffect(() => {
//     document.addEventListener("click", closeDropdown);
//     return () => {
//       document.removeEventListener("click", closeDropdown);
//     };
//   }, []);

//   const linkStyle = {
//     color: "black",
//     fontSize: windowWidth > 768 ? "18px" : "14px",
//     textDecoration: "underline",
//     marginBottom: "0em",
//     padding: "2px",
//     backgroundColor: "white",
//     marginLeft: "2px",
//     fontWeight: "bold",

//   };

//   const dropdownContentStyle = {
//     display: "flex",
//     color: "white",
//     flexDirection: "column",
//     position: "absolute",   
//     backgroundColor: "black",
//     zIndex: "1",
//     fontSize: "14px",
//     left: "0",
//     padding: "5px",
//     margin: "0",          
//     width: "max-content",
//     top: "100%",           
//     transform: "translateY(0.2em)", 
//   };

//   const closeDropdownWithDelay = () => {
//     setTimeout(() => {
//       setShowOpinionsDropdown(false);
//       setShowCollaboratorsDropdown(false);
//     }, 50);
//   };

//   useEffect(() => {
//     const handleWindowResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleWindowResize);

//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);

//   return (

//     <div className="container" style={{ overflow: "auto", display: "flex", alignItems: "left", marginBottom: "2em", border: "none" }}>

//       <div className="row justify-content-left">
//         <div className="col-sm-8">

//           <div className="d-flex flex-column align-items-left">
//             <h2 style={{ color: "black", fontSize: windowWidth > 768 ? "7em" : "2.8em", fontWeight: "bold" }}>
//               public+privacy
//               <Link to={isAuthenticated ? "/collaborator/logout" : "/collaborator/login"} style={linkStyle}>
//                 {isAuthenticated ? "Logout" : "Login"}
//               </Link>
//             </h2>
//           </div>

//           <div>
//             <div>
//               <Link to="/about" style={linkStyle} onClick={closeDropdownWithDelay}>
//                 About
//               </Link>
//             </div>

//             <div className="dropdown">
//               <button className="dropbtn" onClick={(e) => toggleOpinionsDropdown(e)} style={linkStyle}>
//                 Opinions
//               </button>
//               {showOpinionsDropdown &&
//                 <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
//                   <Link className="text-decoration-none" to="/forum/opinions" style={{ color: "white" }}>
//                     Opinion Board
//                   </Link>
//                   {isAuthenticated && (
//                     <Link className="text-decoration-none" to="/forum/opinions/add" style={{ color: "white" }}>
//                       Share Your Opinion
//                     </Link>
//                   )}
//                 </div>
//               }
//             </div>

//             {isAuthenticated ? (
//               <div className="dropdown">
//                 <button className="dropbtn" onClick={(e) => toggleCollaboratorsDropdown(e)} style={linkStyle}>
//                   Collaborator Dashboard
//                 </button>
//                 {showCollaboratorsDropdown && (
//                   <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
//                     <Link className="text-decoration-none" to="/collaborator" style={{ color: "white" }}>
//                       To Collaborators
//                     </Link>
//                     {/* <Link className="text-decoration-none" to="/collaborator/subscribe" style={{ color: "white" }}>
//                       Subscribe
//                     </Link> */}
//                     <Link className="text-decoration-none" to="/collaborator/dashboard" style={{ color: "white" }}>
//                       Collaborator Dashboard
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="dropdown">
//                 <button className="dropbtn" onClick={toggleCollaboratorsDropdown} style={linkStyle}>
//                   Collaborators
//                 </button>
//                 {showCollaboratorsDropdown && (
//                   <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
//                     <Link className="text-decoration-none" to="/collaborator" style={{ color: "white" }}>
//                       To Collaborators
//                     </Link>
//                     {/* <Link className="text-decoration-none" to="/collaborator/subscribe" style={{ color: "white" }}>
//                       Subscribe
//                     </Link> */}
//                     <Link className="text-decoration-none" to="/collaborator/register" style={{ color: "white" }}>
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div>
//               <Link
//                 to="/selected-references"
//                 style={{
//                   color: "black",
//                   fontSize: windowWidth > 768 ? "18px" : "14px",
//                   textDecoration: "underline",
//                   padding: "2px",
//                   backgroundColor: "white",
//                   marginLeft: "1px",
//                   fontWeight: "bold"
//                 }}
//                 onClick={closeDropdownWithDelay}
//               >
//                 Selected References
//               </Link>
//             </div>
//             <div style={{ marginBottom: "0.2em", color: "white" }}>placeholder</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../src/App.css'
import AuthContext from "../components/shared/AuthContext.js"; // Import your AuthContext

const Navbar = () => {

  const { isAuthenticated } = useContext(AuthContext);

  const [showOpinionsDropdown, setShowOpinionsDropdown] = useState(false);
  const [showCollaboratorsDropdown, setShowCollaboratorsDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleOpinionsDropdown = (event) => {
    event.stopPropagation(); // Prevent the event from propagating to the entire page
    setShowOpinionsDropdown(!showOpinionsDropdown);
  };

  const toggleCollaboratorsDropdown = (event) => {
    event.stopPropagation(); // Prevent the event from propagating to the entire page
    setShowCollaboratorsDropdown(!showCollaboratorsDropdown);
  };

  const closeDropdown = () => {
    setShowOpinionsDropdown(false);
    setShowCollaboratorsDropdown(false);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const linkStyle = {
    color: "black",
    fontSize: windowWidth > 768 ? "18px" : "14px",
    textDecoration: "underline",
    marginBottom: "0em",
    padding: "2px",
    backgroundColor: "white",
    marginLeft: "2px",
    fontWeight: "bold",

  };

  const dropdownContentStyle = {
    display: "flex",
    color: "white",
    flexDirection: "column",
    position: "absolute",   // Change position to absolute
    backgroundColor: "black",
    zIndex: "1",
    fontSize: "14px",
    left: "0",
    padding: "5px",
    margin: "0",            // Remove margin
    width: "max-content",
    top: "100%",            // Position the dropdown below the parent
    transform: "translateY(0.2em)", // Adjust vertical alignment
  };

  const closeDropdownWithDelay = () => {
    setTimeout(() => {
      setShowOpinionsDropdown(false);
      setShowCollaboratorsDropdown(false);
    }, 50); // 0.05 second delay
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (

    <div className="container" style={{ overflow: "auto", display: "flex", alignItems: "left", marginBottom: "2em", border: "none" }}>

      <div className="row justify-content-left">

        <div className="col-sm-8">

          <div className="d-flex flex-column align-items-left">
            <h2 style={{ color: "black", fontSize: windowWidth > 768 ? "7em" : "2.8em", fontWeight: "bold" }}>
              public+privacy
              <Link to={isAuthenticated ? "/collaborator/logout" : "/collaborator/login"} style={linkStyle}>
                {isAuthenticated ? "Logout" : "Login"}
              </Link>
            </h2>
          </div>

          {/* Oh I see, this DIV is whole bunch of nar items */}
          <div>
            <div>
              <Link to="/about" style={linkStyle} onClick={closeDropdownWithDelay}>
                About
              </Link>
            </div>

            <div className="dropdown">
              <button className="dropbtn" onClick={(e) => toggleOpinionsDropdown(e)} style={linkStyle}>
                Opinions
              </button>
              {showOpinionsDropdown && (
                <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
                  <Link className="text-decoration-none" to="/forum/opinions" style={{ color: "white" }}>
                    Opinion Board
                  </Link>

                  {isAuthenticated && (
                    <Link className="text-decoration-none" to="/forum/opinions/add" style={{ color: "white" }}>
                      Share Your Opinion
                    </Link>
                  )}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="dropdown">
                <button className="dropbtn" onClick={(e) => toggleCollaboratorsDropdown(e)} style={linkStyle}>
                  Collaborator Dashboard
                </button>
                {showCollaboratorsDropdown && (
                  <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
                    <Link className="text-decoration-none" to="/collaborator" style={{ color: "white" }}>
                      To Collaborators
                    </Link>

                    <Link className="text-decoration-none" to="/collaborator/dashboard" style={{ color: "white" }}>
                      Collaborator Dashboard
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="dropdown">
                <button className="dropbtn" onClick={toggleCollaboratorsDropdown} style={linkStyle}>
                  Collaborators
                </button>
                {showCollaboratorsDropdown && (
                  <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
                    <Link className="text-decoration-none" to="/collaborator" style={{ color: "white" }}>
                      To Collaborators
                    </Link>

                    <Link className="text-decoration-none" to="/collaborator/register" style={{ color: "white" }}>
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div>
              <Link
                to="/globe-visualization"
                style={{
                  color: "black",
                  fontSize: windowWidth > 768 ? "18px" : "14px",
                  textDecoration: "underline",
                  padding: "2px",
                  backgroundColor: "white",
                  marginLeft: "1px",
                  fontWeight: "bold"
                }}
                onClick={closeDropdownWithDelay}
              >
                Subscribe On Earth
              </Link>
            </div>
            <div>
              <Link
                to="/selected-references"
                style={{
                  color: "black",
                  fontSize: windowWidth > 768 ? "18px" : "14px",
                  textDecoration: "underline",
                  padding: "2px",
                  backgroundColor: "white",
                  marginLeft: "1px",
                  fontWeight: "bold"
                }}
                onClick={closeDropdownWithDelay}
              >
                Selected References
              </Link>
            </div>
            <div style={{ marginBottom: "0.2em", color: "white" }}>placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;