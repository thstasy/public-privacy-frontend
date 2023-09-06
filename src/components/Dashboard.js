// import React, { useEffect, useContext, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import AuthContext from "./shared/AuthContext.js";
// import Footer from "../components/Footer.js";
// import '../../src/App.css';
// import useAuthContextLoader from "./shared/useAuthContext.js";

// const Dashboard = () => {
//   const isAuthContextLoaded = useAuthContextLoader();
//   const hasLoginToken = document.cookie.includes("loginToken");
//   const {opinionsByUser, draftsByUser } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthContextLoaded) {
//       setIsLoading(false);
//     }
//   }, [isAuthContextLoaded]);

//   const resetPassword = () => {
//     navigate(`/collaborator/resetPassword1`);
//   };

//   const deleteAccount = () => {
//     navigate(`/collaborator/deleteAccount`);
//   };

//   const HealthCareArray = [];
//   const GenderEqualityArray = [];
//   const EducationalSystemArray = [];

//   // Categorize opinions
//   opinionsByUser.forEach((opinion) => {
//     if (opinion.category === "Health Care") {
//       HealthCareArray.push(opinion);
//     } else if (opinion.category === "Gender Equality") {
//       GenderEqualityArray.push(opinion);
//     } else if (opinion.category === "Educational System") {
//       EducationalSystemArray.push(opinion);
//     }
//   });

//   // Categorize drafts
//     draftsByUser.forEach((draft) => {
//       if (draft.category === "Health Care") {
//         HealthCareArray.push(draft);
//       } else if (draft.category === "Gender Equality") {
//         GenderEqualityArray.push(draft);
//       } else if (draft.category === "Educational System") {
//         EducationalSystemArray.push(draft);
//       }
//     });



//   return (
//     <>
//       {hasLoginToken ? (
//         <div className="container">
//           <div className="row justify-content-left">
//             <div className="col-sm-8 text-left">
//               <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
//                 <div className="d-flex flex-column" style={{ width: "100%", marginBottom: "10px" }}>
//                   <h2 style={{ margin: "0.5em 0", fontWeight: "bolder" }}>COLLABORATOR DASHBOARD</h2>
//                   <h4 style={{ margin: "0.5em 0", fontWeight: "bolder", textDecoration: "underline", lineHeight: "1.2" }}>Collaborator Info</h4>
//                   <div style={{ marginBottom: "0.5em", lineHeight: "1.2" }}>
//                     <h6 style={{ color: "rgb(64, 64, 64)", margin: "0 0 1.5px 2em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.5" }}>
//                       You know who you are. That's already more than enough. 
//                     </h6>
//                     <h6 style={{ color: "rgb(64, 64, 64)", fontWeight: "normal", marginLeft: "2em" }}>
//                       <button
//                         type="button"
//                         onClick={resetPassword}
//                         style={{
//                           backgroundColor: "white",
//                           color: "rgb(64, 64, 64)",
//                           outline: "none",
//                           padding: "0",
//                           textDecoration: "underline",
//                           lineHeight: 1.5
//                         }}
//                       >
//                         Reset Password
//                       </button>
//                     </h6>
//                     <h6 style={{ color: "rgb(64, 64, 64)", fontWeight: "normal", marginLeft: "2em" }}>
//                       <button
//                         type="button"
//                         onClick={deleteAccount}
//                         style={{
//                           backgroundColor: "white",
//                           color: "black",
//                           borderRadius: 0,
//                           outline: "none",
//                           padding: "0",
//                           textDecoration: "underline",
//                           margin: "0 0 1.2px 0",
//                         }}
//                       >
//                         Delete Account
//                       </button>
//                     </h6>
//                   </div>
//                 </div>

//                 <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
//                   <h4 style={{
//                     margin: "0.5em 0",
//                     fontWeight: "bolder",
//                     textDecoration: "underline",
//                     lineHeight: "1.2"
//                   }}>
//                     Shared Opinions
//                   </h4>
//                 </div>

//                 <div className="row justify-content-left">
//                   <div className="col-sm-8 text-left" style={{ width: "100%" }}>
//                     <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
//                       {opinionsByUser.map((opinion, index) => (
//                         <React.Fragment key={opinion.id}>
//                           <h5 style={{ fontWeight: "bold", wordBreak: "break-word", lineHeight: "1.2" }}>
//                             {opinion.category.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
//                           </h5>
//                           <h6 style={{ fontWeight: "normal", wordBreak: "break-word", marginBottom: "0.5em", lineHeight: "1.0" }}>
//                             {opinion.length > 0 ? "" : "No Opinions For Now"}
//                           </h6>
//                           {opinion.length > 0 && (
//                             <div>
//                               <div
//                                 key={opinion.id}
//                                 style={{
//                                   border: "10px solid black",
//                                   padding: "0.5em",
//                                   marginRight: "0",
//                                   marginBottom: "0.5em",
//                                   marginLeft: "0",
//                                   lineHeight: "1.2",
//                                 }}
//                               >
//                                 <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
//                                   <h6
//                                     className="text-capitalize"
//                                     style={{
//                                       textDecoration: "underline",
//                                       margin: "0.5em 1em 0.5em 1.1em",
//                                       fontWeight: "bolder",
//                                       wordBreak: "break-word",
//                                       lineHeight: "1.2",
//                                       whiteSpace: "pre-line"
//                                     }}
//                                   >
//                                     {opinion.title}
//                                   </h6>
//                                   <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line" }}>
//                                     {opinion.body}
//                                   </h6>

//                                   {opinion.country !== null && opinion.city !== null && (
//                                     <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", fontSize: "smaller", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line", textAlign: "right" }}>
//                                       inspired at <span style={{ fontWeight: "bolder" }}>{opinion.country}, {opinion.city}</span>
//                                     </h6>
//                                   )}
//                                   <h6
//                                     style={{
//                                       margin: "0em 1em 0.5em 1.1em",
//                                       fontWeight: "lighter",
//                                       fontSize: "smaller",
//                                       wordBreak: "break-word",
//                                       textAlign: "right",
//                                       lineHeight: "1.2",
//                                       textAlign: "right"
//                                     }}
//                                   >
//                                     Updated At: {new Date(opinion.updatedAt).toLocaleDateString()}
//                                     <br />
//                                   </h6>
//                                 </Link>
//                               </div>
//                             </div>
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <br />

//                 <div className="row justify-content-left">
//                   <div className="col-sm-8 text-left" style={{ width: "100%" }}>
//                     <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
//                       <h4 style={{ margin: "0.5em 0", fontWeight: "bolder", textDecoration: "underline" }}>Saved Drafts</h4>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row justify-content-left">
//                   <div className="col-sm-8 text-left" style={{ width: "100%" }}>
//                     <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
//                       {draftsByUser.map((draft, index) => (
//                         <React.Fragment key={draft.id}>
//                           <h5 style={{ fontWeight: "bold", wordBreak: "break-word", lineHeight: "1.2" }}>
//                             {draft.category.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
//                           </h5>
//                           <h6 style={{ fontWeight: "normal", wordBreak: "break-word", marginBottom: "0.5em", lineHeight: "1.0" }}>
//                             {draft.length > 0 ? "" : "No Drafts For Now"}
//                           </h6>
//                           {draft.length > 0 && (
//                             <div style={{ width: "100%" }}>
//                               <div
//                                 key={draft.id}
//                                 style={{
//                                   border: "10px solid black",
//                                   padding: "0.5em",
//                                   marginRight: "0",
//                                   marginBottom: "0.5em",
//                                   marginLeft: "0",
//                                   lineHeight: "1.2",
//                                 }}
//                               >
//                                 <Link to={`/forum/drafts/${draft.id}`} className="text-decoration-none">
//                                   <h6
//                                     className="text-capitalize"
//                                     style={{
//                                       textDecoration: "underline",
//                                       margin: "0.5em 1em 0.5em 1.1em",
//                                       fontWeight: "bolder",
//                                       wordBreak: "break-word",
//                                       lineHeight: "1.2",
//                                       whiteSpace: "pre-line"
//                                     }}
//                                   >
//                                     {draft.title}
//                                   </h6>
//                                   <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line" }}>
//                                     {draft.body}
//                                   </h6>

//                                   {draft.country || draft.city ? (
//                                     <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", fontSize: "smaller", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line", textAlign: "right" }}>
//                                       inspired at <span style={{ fontWeight: "bolder" }}>{draft.country}, {draft.city}</span>
//                                     </h6>
//                                   ) : null}

//                                   <h6
//                                     style={{
//                                       margin: "0em 1em 0.5em 1.1em",
//                                       fontWeight: "lighter",
//                                       fontSize: "smaller",
//                                       wordBreak: "break-word",
//                                       textAlign: "right",
//                                       lineHeight: "1.2"
//                                     }}
//                                   >
//                                     Updated At: {new Date(draft.updatedAt).toLocaleDateString()}
//                                     <br />
//                                   </h6>
//                                 </Link>
//                               </div>
//                             </div>
//                           )}
//                         </React.Fragment>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="container">
//           <div className="row justify-content-left">
//             <div className="col-sm-8">
//               <h2>Please log in first.</h2>
//             </div>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useContext, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import AuthContext from "./shared/AuthContext.js";
// import Footer from "../components/Footer.js";
// import '../../src/App.css';
// import useAuthContextLoader from "./shared/useAuthContext.js";

// const Dashboard = () => {
//   const isAuthContextLoaded = useAuthContextLoader();
//   const hasLoginToken = document.cookie.includes("loginToken");
//   const { opinionsByUser, draftsByUser, AccessDashboard } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();


//   const authContext = useContext(AuthContext);

//   useEffect(() => {
//     authContext.AccessDashboard();
//   }, []);

//   const navigate = useNavigate();

//   console.log(draftsByUser);
//   console.log(opinionsByUser);

//   useEffect(() => {
//     if (isAuthContextLoaded) {
//       setIsLoading(false);
//     }
//   }, [isAuthContextLoaded]);

//   const resetPassword = () => {
//     navigate(`/collaborator/resetPassword1`);
//   };

//   const deleteAccount = () => {
//     navigate(`/collaborator/deleteAccount`);
//   };

//   const HealthCareArray = [];
//   const GenderEqualityArray = [];
//   const EducationalSystemArray = [];

//   // Categorize opinions
//   opinionsByUser.forEach((opinion) => {
//     if (opinion.category === "Health Care") {
//       HealthCareArray.push(opinion);
//     } else if (opinion.category === "Gender Equality") {
//       GenderEqualityArray.push(opinion);
//     } else if (opinion.category === "Educational System") {
//       EducationalSystemArray.push(opinion);
//     }
//   });

//   // Categorize drafts
//   draftsByUser.forEach((draft) => {
//     if (draft.category === "Health Care") {
//       HealthCareArray.push(draft);
//     } else if (draft.category === "Gender Equality") {
//       GenderEqualityArray.push(draft);
//     } else if (draft.category === "Educational System") {
//       EducationalSystemArray.push(draft);
//     }
//   });

//   return (
//     <>
//       {hasLoginToken ? (
//         <div className="container">
//           <div className="row justify-content-left">
//             <div className="col-sm-8 text-left">
//               <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
//                 {/* Collaborator Info */}
//                 <div className="d-flex flex-column" style={{ width: "100%", marginBottom: "10px" }}>
//                   <h2 style={{ margin: "0.5em 0", fontWeight: "bolder" }}>COLLABORATOR DASHBOARD</h2>
//                   <h4 style={{ margin: "0.5em 0", fontWeight: "bolder", textDecoration: "underline", lineHeight: "1.2" }}>Collaborator Info</h4>
//                   <div style={{ marginBottom: "0.5em", lineHeight: "1.2" }}>
//                     <h6 style={{ color: "rgb(64, 64, 64)", margin: "0 0 1.5px 2em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.5" }}>
//                       You know who you are. That's enough. 
//                     </h6>
//                     <h6 style={{ color: "rgb(64, 64, 64)", fontWeight: "normal", marginLeft: "2em" }}>
//                       <button
//                         type="button"
//                         onClick={resetPassword}
//                         style={{
//                           backgroundColor: "white",
//                           color: "rgb(64, 64, 64)",
//                           outline: "none",
//                           padding: "0",
//                           textDecoration: "underline",
//                           lineHeight: 1.5
//                         }}
//                       >
//                         Reset Password
//                       </button>
//                     </h6>
//                     <h6 style={{ color: "rgb(64, 64, 64)", fontWeight: "normal", marginLeft: "2em" }}>
//                       <button
//                         type="button"
//                         onClick={deleteAccount}
//                         style={{
//                           backgroundColor: "white",
//                           color: "black",
//                           borderRadius: 0,
//                           outline: "none",
//                           padding: "0",
//                           textDecoration: "underline",
//                           margin: "0 0 1.2px 0",
//                         }}
//                       >
//                         Delete Account
//                       </button>
//                     </h6>
//                   </div>
//                 </div>



              

//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="container">
//           <div className="row justify-content-left">
//             <div className="col-sm-8">
//               <h2>Please log in first.</h2>
//             </div>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// };

// // Component for rendering opinion category
// const OpinionCategory = ({ opinions, category }) => {
//   return (
//     <>
//       <h5 style={{ fontWeight: "bold", wordBreak: "break-word", lineHeight: "1.2" }}>
//         {category}
//       </h5>
//       <div>
//         {opinions.length > 0 ? (
//           opinions.map((opinion, index) => (
//             <div
//               key={opinion.id}
//               style={{
//                 border: "10px solid black",
//                 padding: "0.5em",
//                 marginRight: "0",
//                 marginBottom: "0.5em",
//                 marginLeft: "0",
//                 lineHeight: "1.2",
//               }}
//             >
//               {/* Additional content for opinion */}
//               <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
//                 <h6
//                   className="text-capitalize"
//                   style={{
//                     textDecoration: "underline",
//                     margin: "0.5em 1em 0.5em 1.1em",
//                     fontWeight: "bolder",
//                     wordBreak: "break-word",
//                     lineHeight: "1.2",
//                     whiteSpace: "pre-line"
//                   }}
//                 >
//                   {opinion.title}
//                 </h6>
//                 {/* Additional content for opinion */}
//                 <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line" }}>
//                   {opinion.body}
//                 </h6>

//                 {opinion.country !== null && opinion.city !== null && (
//                   <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", fontSize: "smaller", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line", textAlign: "right" }}>
//                     inspired at <span style={{ fontWeight: "bolder" }}>{opinion.country}, {opinion.city}</span>
//                   </h6>
//                 )}
//                 <h6
//                   style={{
//                     margin: "0em 1em 0.5em 1.1em",
//                     fontWeight: "lighter",
//                     fontSize: "smaller",
//                     wordBreak: "break-word",
//                     textAlign: "right",
//                     lineHeight: "1.2",
//                     textAlign: "right"
//                   }}
//                 >
//                   Updated At: {new Date(opinion.updatedAt).toLocaleDateString()}
//                   <br />
//                 </h6>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <h6 style={{ fontWeight: "normal", wordBreak: "break-word", marginBottom: "0.5em", lineHeight: "1.0" }}>
//             No Opinions For Now
//           </h6>
//         )}
//       </div>
//     </>
//   );
// };

// // Component for rendering draft category
// const DraftCategory = ({ drafts, category }) => {
//   return (
//     <>
//       <h5 style={{ fontWeight: "bold", wordBreak: "break-word", lineHeight: "1.2" }}>
//         {category}
//       </h5>
//       <div>
//         {drafts.length > 0 ? (
//           drafts.map((draft, index) => (
//             <div
//               key={draft.id}
//               style={{
//                 border: "10px solid black",
//                 padding: "0.5em",
//                 marginRight: "0",
//                 marginBottom: "0.5em",
//                 marginLeft: "0",
//                 lineHeight: "1.2",
//               }}
//             >
//               <Link to={`/forum/drafts/${draft.id}`} className="text-decoration-none">
//                 <h6
//                   className="text-capitalize"
//                   style={{
//                     textDecoration: "underline",
//                     margin: "0.5em 1em 0.5em 1.1em",
//                     fontWeight: "bolder",
//                     wordBreak: "break-word",
//                     lineHeight: "1.2",
//                     whiteSpace: "pre-line"
//                   }}
//                 >
//                   {draft.title}
//                 </h6>
//                 <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line" }}>
//                   {draft.body}
//                 </h6>

//                 {draft.country || draft.city ? (
//                   <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", fontSize: "smaller", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line", textAlign: "right" }}>
//                     inspired at <span style={{ fontWeight: "bolder" }}>{draft.country}, {draft.city}</span>
//                   </h6>
//                 ) : null}

//                 <h6
//                   style={{
//                     margin: "0em 1em 0.5em 1.1em",
//                     fontWeight: "lighter",
//                     fontSize: "smaller",
//                     wordBreak: "break-word",
//                     textAlign: "right",
//                     lineHeight: "1.2"
//                   }}
//                 >
//                   Updated At: {new Date(draft.updatedAt).toLocaleDateString()}
//                   <br />
//                 </h6>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <h6 style={{ fontWeight: "normal", wordBreak: "break-word", marginBottom: "0.5em", lineHeight: "1.0" }}>
//             No Drafts For Now
//           </h6>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useEffect, useContext} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "./shared/AuthContext.js";
import Footer from "../components/Footer.js";
import '../../src/App.css';
import useAuthContextLoader from "./shared/useAuthContext.js";

const Dashboard = () => {
  const isAuthContextLoaded = useAuthContextLoader();
  const { AccessDashboard, opinionsByUser,draftsByUser } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthContextLoaded) {
    }
  }, [isAuthContextLoaded]);

  const HealthCareArray = [];
  const GenderEqualityArray = [];
  const EducationalSystemArray = [];

  const categorizedDrafts = {
    'health care': [],
    'gender equality': [],
    'educational system': [],
  };

  const categorizedOpinions = {
    'health care': [],
    'gender equality': [],
    'educational system': [],
  };

  useEffect(() => {
    const accessDashboardSubmit = async () => {
      await AccessDashboard();
    };
    accessDashboardSubmit();
  }, [id]);

  opinionsByUser.forEach((opinion) => {
    if (opinion.category === "Health Care") {
      HealthCareArray.push(opinion);
    } else if (opinion.category === "Gender Equality") {
      GenderEqualityArray.push(opinion);
    } else if (opinion.category === "Educational System") {
      EducationalSystemArray.push(opinion);
    }
  });

  opinionsByUser.forEach((opinion) => {
    if (categorizedOpinions[opinion.category]) {
      categorizedOpinions[opinion.category].push(opinion);
    }
  });

  draftsByUser.forEach((draft) => {
    if (draft.category === "Health Care") {
      HealthCareArray.push(draft);
    } else if (draft.category === "Gender Equality") {
      GenderEqualityArray.push(draft);
    } else if (draft.category === "Educational System") {
      EducationalSystemArray.push(draft);
    }
  });

  draftsByUser.forEach((draft) => {
    if (categorizedDrafts[draft.category]) {
      categorizedDrafts[draft.category].push(draft);
    }
  });

  const resetPassword = () => {
    navigate(`/collaborator/resetPassword1`);
  };

  const deleteAccount = () => {
    navigate(`/collaborator/deleteAccount`);
  };

  return (
    <>
      <div className="container">
          <div className="row justify-content-left"  >
            <div className="col-sm-8 text-left">
              <div className="d-flex flex-column align-items-left" style={{ width: "100%", color:"black"}}>
                {/* Collaborator Info section */}
                <div className="d-flex flex-column" style={{ width: "100%", marginBottom: "10px", color:"black" }}>
                  <h2 style={{ margin: "0.5em 0", fontWeight: "bolder", color:"black" }}>COLLABORATOR DASHBOARD</h2>
                  <h4 style={{ margin: "0.5em 0", fontWeight: "bolder", textDecoration: "underline", lineHeight: "1.2",color:"black" }}>Collaborator Info</h4>
                  <div style={{ marginBottom: "0.5em", lineHeight: "1.2", color:"black" }}>
                    
                    <h6 style={{ marginLeft:"2em",color: "rgb(64, 64, 64)", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2" }}>
                      You know who you are, that's enough. &#x263A;
                    </h6>
                    <h6 style={{ marginLeft:"2em",color: "rgb(64, 64, 64)", fontWeight: "normal" }}>
                      <button
                        type="button"
                        onClick={resetPassword}
                        style={{
                          backgroundColor: "white",
                          color: "rgb(64, 64, 64)",
                          outline: "none",
                          padding: "0",
                          textDecoration: "underline",
                          margin: "0",
                          lineHeight: "1.0"
                        }}
                      >
                        Reset Password
                      </button>
                    </h6>
                    <h6>
                      <button
                        type="button"
                        onClick={deleteAccount}
                        style={{
                          marginLeft:"2em",
                          backgroundColor: "white",
                          color: "black",
                          borderRadius: 0,
                          outline: "none",
                          padding: "0",
                          textDecoration: "underline",
                          lineHeight: "1.0"
                        }}
                      >
                        Delete Account
                      </button>
                    </h6>
                  </div>
                </div>

                {/* Shared Opinions section */}
                <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
                  <h4 style={{
                    margin: "0.5em 0",
                    fontWeight: "bolder",
                    textDecoration: "underline",
                    lineHeight: "1.2",
                    color:"black"
                  }}>
                    Shared Opinions
                  </h4>
                </div>

                <div className="row justify-content-left" >
                  <div className="col-sm-8 text-left">
                    <div className="d-flex flex-column align-items-left" style={{ width: "100%",color:"black" }}>
                      {Object?.entries(categorizedOpinions)?.map(([category, opinions], index) => (
                        <React.Fragment key={category}>
                          {index !== 0 && <div style={{ margin: "1em" }}></div>}
                          <h5 style={{ fontWeight: "bold", wordBreak: "break-word", lineHeight: "1.2", color:"black" }}>
                            {category.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                          </h5>
                          <h6 style={{ fontWeight: "normal", wordBreak: "break-word", marginBottom: "0.5em", lineHeight: "1.0",color:"black" }}>
                            {opinions.length > 0 ? "" : "No Opinions For Now"}
                          </h6>
                          {opinions.length > 0 && (
                            <div >
                              {opinions.map((opinion) => (
                                <div
                                  key={opinion.id}
                                  style={{
                                    border: "10px solid black",
                                    padding: "0.5em",
                                    marginRight: "0",
                                    marginBottom: "0.5em",
                                    marginLeft: "0",
                                    lineHeight: "1.2",
                                    color:"black"
                                  }}
                                >
                                  <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
                                    <h6
                                      className="text-capitalize"
                                      style={{
                                        textDecoration: "underline",
                                        margin: "0.5em 1em 0.5em 1.1em",
                                        fontWeight: "bolder",
                                        wordBreak: "break-word",
                                        lineHeight: "1.2",
                                        whiteSpace: "pre-line",
                                        color:"black"
                                      }}
                                    >
                                      {opinion.title}
                                    </h6>
                                    <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line",color:"black" }}>
                                      {opinion.body}
                                    </h6>
                                    <h6
                                      style={{
                                        margin: "0em 1em 0.5em 1.1em",
                                        fontWeight: "lighter",
                                        fontSize: "smaller",
                                        wordBreak: "break-word",
                                        textAlign: "right",
                                        lineHeight: "1.2",
                                        textAlign:"right",
                                        color:"black"
                                      }}
                                    >
                                     inspired at <span style={{ fontWeight: "bold" }}>{opinion.country}</span>, <span style={{ fontWeight: "bold" }}>{opinion.city}</span>
                                      <br/>
                                      Updated At: {new Date(opinion.updatedAt).toLocaleDateString()}
                                    </h6>
                                    
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <br />

                {/* Saved Drafts */}
                <div className="row justify-content-left" >
                  <div className="col-sm-8 text-left" >
                    <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
                      <h4 style={{ margin: "0.5em 0", fontWeight: "bolder", textDecoration: "underline",color:"black" }}>Saved Drafts</h4>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-left" >
                  <div className="col-sm-8 text-left" >
                    <div className="d-flex flex-column align-items-left" style={{ width: "100%" }}>
                      {Object?.entries(categorizedDrafts)?.map(([category, drafts], index) => (
                        <React.Fragment key={category}>
                          {index !== 0 && <div style={{ margin: "1em" }}></div>}
                          <h5 style={{ fontWeight: "bold", wordBreak: "break-word", lineHeight: "1.2",color:"black" }}>
                            {category.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                          </h5>
                          <h6 style={{ fontWeight: "normal", wordBreak: "break-word", marginBottom: "0.5em", lineHeight: "1.0",color:"black" }}>
                            {drafts.length > 0 ? "" : "No Drafts For Now"}
                          </h6>
                          {drafts.length > 0 && (
                            <div style={{ width: "100%" }}>
                              {drafts.map((draft) => (
                                <div
                                  key={draft.id}
                                  style={{
                                    border: "10px solid black",
                                    padding: "0.5em",
                                    marginRight: "0",
                                    marginBottom: "0.5em",
                                    marginLeft: "0",
                                    lineHeight: "1.2",
                                    color:"black"
                                  }}
                                >
                                  <Link to={`/forum/drafts/${draft.id}`} className="text-decoration-none">
                                    <h6
                                      className="text-capitalize"
                                      style={{
                                        textDecoration: "underline",
                                        margin: "0.5em 1em 0.5em 1.1em",
                                        fontWeight: "bolder",
                                        wordBreak: "break-word",
                                        lineHeight: "1.2",
                                        whiteSpace: "pre-line",
                                        color:"black"
                                      }}
                                    >
                                      {draft.title}
                                    </h6>
                                    <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal", wordBreak: "break-word", lineHeight: "1.2", whiteSpace: "pre-line" ,color:"black"}}>
                                      {draft.body}
                                    </h6>
                                    <h6
                                      style={{
                                        margin: "0em 1em 0.5em 1.1em",
                                        fontWeight: "lighter",
                                        fontSize: "smaller",
                                        wordBreak: "break-word",
                                        textAlign: "right",
                                        lineHeight: "1.2",
                                        textAlign:"right",
                                        color:"black"
                                      }}
                                    >
                                      inspired at <span style={{ fontWeight: "bold" }}>{draft.country}</span>, <span style={{ fontWeight: "bold" }}>{draft.city}</span>
                                      <br/>
                                      Updated At: {new Date(draft.updatedAt).toLocaleDateString()}
                                    </h6>

                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
