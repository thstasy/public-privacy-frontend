import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./shared/AuthContext.js";
import httpClient from "../http-common.js";
import Footer from "../components/Footer.js";
import Alert from "./Alert.js"; // Update the path to your Alert.js file

const OpinionsList = () => {
  const { loginToken } = useContext(AuthContext);
  const [isOpinionsLoaded, setIsOpinionsLoaded] = useState(false);
  const [opinions, setOpinions] = useState([]);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const hasLoginToken = document.cookie.includes("loginToken");

  const navigate = useNavigate();

  const handleShowAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };


  // useEffect(() => {

  //   setIsOpinionsLoaded(false);

  //   const getAll = async () => {
  //     const headers = {
  //       "loginToken": loginToken,
  //     };

  //     try {
  //       const response = await httpClient.get('/forum/opinions', { withCredentials: true, headers });
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //       handleShowAlert(`LOADING THE UNDEFINED DATA...`, "notification");
  //       return;
  //     }
  //   };

  //   getAll()
  //     .then(response => {
  //       const opinionsData = response?.data;
  //       if ([204, 403, 500, 205].includes(response?.status)) {
  //         handleShowAlert(`Oops, there are some data fetching issues. Come back later, please.`, "notification");
  //         navigate("/about");
  //         navigate("/about");
  //         return;
  //       }

  //       const updatedOpinions = opinionsData?.map(opinionData => {
  //         const updatedAtString = new Date(opinionData.updatedAt).toLocaleDateString();
  //         const createdAtString = new Date(opinionData.createdAt).toLocaleDateString();

  //         return {
  //           id: opinionData.id,
  //           updatedAt: updatedAtString,
  //           createdAt: createdAtString,
  //           collaboratorName: opinionData.collaboratorName,
  //           category: opinionData.category,
  //           body: opinionData.body,
  //           title: opinionData.title,
  //           country: opinionData.country,
  //           city: opinionData.city,
  //         };
  //       });
  //       setOpinions(updatedOpinions);
  //       setIsOpinionsLoaded(true);
  //       handleHideAlert();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       if (hasLoginToken) {
  //         handleShowAlert("Apologies from the server side. We'll fix it asap.", "notification");
  //         navigate("/about");
  //       } else {
  //         handleShowAlert("Not Authenticated.", "notification");
  //         navigate("/about");
  //       }
  //     });
  // }, [hasLoginToken, loginToken, navigate]);
///here it works traditionally
  // useEffect(() => {

  //   setIsOpinionsLoaded(false); 

  //   if (hasLoginToken) {
  //     const getAll = async () => {

  //       const headers = {
  //         "loginToken": loginToken,
  //       };

  //       try {
  //         const response = await httpClient.get('/forum/opinions', { withCredentials: true, headers });
  //         return response;
  //       } catch (error) {
  //         console.log(error);
  //         handleShowAlert(`LOADING THE UNDEFINED DATA...`, "notification");
  //         return;
  //       }
  //     };


  //     getAll()
  //       .then(response => {
  //         const opinionsData = response?.data;
  //         if ([204, 403, 500, 205].includes(response?.status)) {
  //           handleShowAlert(`Oops, there are some data fetching issues. Come back later, please.`, "notification");
  //           navigate("/about");
  //           navigate("/about");
  //           return;
  //         }

  //         const updatedOpinions = opinionsData?.map(opinionData => {
  //           const updatedAtString = new Date(opinionData.updatedAt).toLocaleDateString();
  //           const createdAtString = new Date(opinionData.createdAt).toLocaleDateString();

  //           return {
  //             id: opinionData.id,
  //             updatedAt: updatedAtString,
  //             createdAt: createdAtString,
  //             collaboratorName: opinionData.collaboratorName,
  //             category: opinionData.category,
  //             body: opinionData.body,
  //             title: opinionData.title,
  //             country: opinionData.country,
  //             city: opinionData.city,
  //           };
  //         });
  //         setOpinions(updatedOpinions);
  //         setIsOpinionsLoaded(true);
  //         handleHideAlert(); // Hide the alert when data is loaded
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         if (hasLoginToken) {
  //           handleShowAlert("Apologies from the server side. We'll fix it asap.", "notification");
  //           navigate("/about");
  //         } else {
  //           handleShowAlert("Not Authenticated.", "notification");
  //           navigate("/about");
  //         }
  //       });
  //   } else {
  //     handleShowAlert(`Please log in first to see the content.`, "notification");
  //   }
  // }, [hasLoginToken]);


  useEffect(() => {

    setIsOpinionsLoaded(false); 

    if (hasLoginToken) {
      const getAll = async () => {

        const headers = {
          "loginToken": loginToken,
        };

        try {
          const response = await httpClient.get('/forum/opinions', { withCredentials: true, headers });
          return response;
        } catch (error) {
          console.log(error);
          handleShowAlert(`LOADING THE UNDEFINED DATA...`, "notification");
          return;
        }
      };


      getAll()
        .then(response => {
          const opinionsData = response?.data;
          if ([204, 403, 500, 205].includes(response?.status)) {
            handleShowAlert(`Oops, there are some data fetching issues. Come back later, please.`, "notification");
            navigate("/about");
            navigate("/about");
            return;
          }

          const updatedOpinions = opinionsData?.map(opinionData => {
            const updatedAtString = new Date(opinionData.updatedAt).toLocaleDateString();
            const createdAtString = new Date(opinionData.createdAt).toLocaleDateString();

            return {
              id: opinionData.id,
              updatedAt: updatedAtString,
              createdAt: createdAtString,
              collaboratorName: opinionData.collaboratorName,
              category: opinionData.category,
              body: opinionData.body,
              title: opinionData.title,
              country: opinionData.country,
              city: opinionData.city,
            };
          });
          setOpinions(updatedOpinions);
          setIsOpinionsLoaded(true);
          handleHideAlert(); // Hide the alert when data is loaded
        })
        .catch(error => {
          console.log(error);
          if (hasLoginToken) {
            handleShowAlert("Apologies from the server side. We'll fix it asap.", "notification");
            navigate("/about");
          } else {
            handleShowAlert("Not Authenticated.", "notification");
            navigate("/about");
          }
        });
      
    } else {
      handleShowAlert(`Please log in first to see the content.`, "notification");
    }
  }, [hasLoginToken]);

  console.log("isOpinionsLoaded:", isOpinionsLoaded);
  console.log("opinions:", opinions);

    let opinionBlocks = [];
    if (isOpinionsLoaded && opinions) {
      opinionBlocks = Object.entries(opinions.reduce((acc, opinion) => {
        if (!acc[opinion.category]) {
          acc[opinion.category] = [];
        }
        acc[opinion.category].push(opinion);
        return acc;
      }, {})).map(([category, opinions]) => (
        <div key={category}>
          <h4 style={{ fontWeight: "bold" , color:"black"}}>{category}</h4>
          {opinions.map(opinion => (
            <div key={opinion.id} style={{ border: "10px solid black", padding: "1em", margin: "1em 0" , color:"black"}}>
              <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
                <h5 className="text-capitalize" style={{ textDecoration: "underline", wordBreak: "break-word", whiteSpace: "pre-line" , color:"black"}}>
                  {opinion.title}
                </h5>
                <h6 style={{ fontWeight: "normal", wordBreak: "break-word", whiteSpace: "pre-line", color:"black" }} className="text-left">
                  {opinion.body}
                </h6>
                <br/><br/>
                {opinion.country || opinion.city ? (
                  <h6 style={{ fontWeight: "normal", wordBreak: "break-word", whiteSpace: "pre-line", textAlign: "right", fontSize: "smaller", color:"black" }} className="text-capitalize text-left">
                    inspired at <span style={{ fontWeight: "bolder" }}>{opinion.country}, {opinion.city}</span>
                  </h6>
                ) : null}
                <h6 style={{ fontSize: "smaller", fontWeight: "lighter", wordBreak: "break-word", textAlign: "right", color:"black" }}>
                  Last Updated: {opinion.updatedAt}
                </h6>
              </Link>
            </div>
          ))}
        </div>
      ));
    }  

    // return (
    //     <>
    //       {showAlert && (
    //         <Alert message={alertMessage} type={alertType} onClose={handleHideAlert} />
    //       )}
    //       <div className="container">
    //         <div className="row justify-content-left">
    //           <div className="col-sm-8">
    //             <div className="d-flex flex-column align-items-left">
    //               <h2 style={{ fontWeight: "bolder" }}>OPINIONS</h2>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row justify-content-left">
    //           <div className="col-sm-8 text-left">
    //             <div
    //               className="d-flex flex-column align-items-left"
    //               style={{ width: "100%", margin: "0 auto", color: "black" }}
    //             >
    //               {opinionBlocks.map(opinionBlock => (
    //                 <div key={opinionBlock.category}>
    //                   <h4 style={{ fontWeight: "bold", color: "black" }}>{opinionBlock.category}</h4>
    //                   {opinionBlock.opinions.map(opinion => (
    //                     <div key={opinion.id} style={{ border: "10px solid black", padding: "1em", margin: "1em 0", color: "black" }}>
    //                       {hasLoginToken ? (
    //                         <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
    //                           <h5 className="text-capitalize" style={{ textDecoration: "underline", wordBreak: "break-word", whiteSpace: "pre-line", color: "black" }}>
    //                             {opinion.title}
    //                           </h5>
    //                           <h6 style={{ fontWeight: "normal", wordBreak: "break-word", whiteSpace: "pre-line", color: "black" }} className="text-left">
    //                             {opinion.body}
    //                           </h6>
    //                           {opinion.country || opinion.city ? (
    //                             <h6 style={{ fontWeight: "normal", wordBreak: "break-word", whiteSpace: "pre-line", textAlign: "right", fontSize: "smaller", color: "black" }} className="text-capitalize text-left">
    //                               inspired at <span style={{ fontWeight: "bolder" }}>{opinion.country}, {opinion.city}</span>
    //                             </h6>
    //                           ) : null}
    //                           <h6 style={{ fontSize: "smaller", fontWeight: "lighter", wordBreak: "break-word", textAlign: "right", color: "black" }}>
    //                             Last Updated: {opinion.updatedAt}
    //                           </h6>
    //                         </Link>
    //                       ) : (
    //                         // Non-clickable content for non-logged-in users
    //                         <div>
    //                           <h5 className="text-capitalize" style={{ textDecoration: "none", wordBreak: "break-word", whiteSpace: "pre-line", color: "black" }}>
    //                             {opinion.title}
    //                           </h5>
    //                           <h6 style={{ fontWeight: "normal", wordBreak: "break-word", whiteSpace: "pre-line", color: "black" }} className="text-left">
    //                             {opinion.body}
    //                           </h6>
    //                           {opinion.country || opinion.city ? (
    //                             <h6 style={{ fontWeight: "normal", wordBreak: "break-word", whiteSpace: "pre-line", textAlign: "right", fontSize: "smaller", color: "black" }} className="text-capitalize text-left">
    //                               inspired at <span style={{ fontWeight: "bolder" }}>{opinion.country}, {opinion.city}</span>
    //                             </h6>
    //                           ) : null}
    //                           <h6 style={{ fontSize: "smaller", fontWeight: "lighter", wordBreak: "break-word", textAlign: "right", color: "black" }}>
    //                             Last Updated: {opinion.updatedAt}
    //                           </h6>
    //                         </div>
    //                       )}
    //                     </div>
    //                   ))}
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <br />
    //       <Footer />
    //     </>
    //   );
    // };
    
    // export default OpinionsList;
    

  return (
    <>
    {showAlert && (
      <Alert
        message={alertMessage}
        type={alertType}
        onClose={handleHideAlert}
        />
    )}
    <div className="container">
      <div className="row justify-content-left">
        <div className="col-sm-8">
          <div className="d-flex flex-column align-items-left">
            <h2 style={{ fontWeight: "bolder"}}>OPINIONS</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-left">
        <div className="col-sm-8 text-left">
          <div className="d-flex flex-column align-items-left" style={{ width: '100%', margin: '0 auto' , color:"black"}}>
            {hasLoginToken && isOpinionsLoaded ? (
                opinionBlocks.length > 0 ? (
                  opinionBlocks
                ) : (
                  <div className="text-left">
                    <h5>No Opinions available.</h5>
                  </div>
                )) :(
              <div className="text-left">
                <h5>Please consider logging in when the data loads.</h5>
              </div>
            )}
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
    <Footer />
  </>
);
}
export default OpinionsList;


// import React, { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "./shared/AuthContext.js";
// import httpClient from "../http-common.js";
// import Footer from "../components/Footer.js";
// import Alert from "./Alert.js"; // Update the path to your Alert.js file

// const OpinionsList = () => {
//   const { isAuthenticated, loginToken } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const [opinions, setOpinions] = useState([]);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("");

//   const navigate = useNavigate();

//   const handleShowAlert = (message, type) => {
//     setAlertMessage(message);
//     setAlertType(type);
//     setShowAlert(true);
//   };

//   const handleHideAlert = () => {
//     setShowAlert(false);
//   };

//   useEffect(() => {
//     const getAll = async () => {
//       const headers = {
//         "loginToken": loginToken,
//       };

//       try {
//         const response = await httpClient.get('/forum/opinions', { withCredentials: true, headers });
//         return response;
//       } catch (error) {
//         // console.log(error);
//         handleShowAlert(`LOADING THE UNDEFINED DATA...`, "notification");
//       }
//     };

//     getAll()
//       .then(response => {
//         const opinionsData = response?.data;
//         if ([204, 403, 500, 205].includes(response?.status)) {
//           handleShowAlert(`Oops, there are some data fetching issues. Come back later, please.`, "notification");
//           setShowAlert(true);
//           navigate("/about");
//           return;
//         }

//         // console.log(isAuthenticated);
//         // console.log(opinionsData);

//         const updatedOpinions = opinionsData?.map(opinionData => {
//           const updatedAtString = new Date(opinionData.updatedAt).toLocaleDateString();
//           const createdAtString = new Date(opinionData.createdAt).toLocaleDateString();

//           return {
//             id: opinionData.id,
//             updatedAt: updatedAtString,
//             createdAt: createdAtString,
//             collaboratorName: opinionData.collaboratorName,
//             category: opinionData.category,
//             body: opinionData.body,
//             title: opinionData.title,
//           };
//         });
//         setOpinions(updatedOpinions);
//       })
//       .catch(error => {
//         // console.log(error);
//         if (isAuthenticated) {
//           handleShowAlert("Apologies from the server side. We'll fix it asap.", "notification");
//         } else {
//           handleShowAlert("Not Authenticated.", "notification");
//         }
//       });
//   }, [isAuthenticated]);

//   const opinionBlocks = Object.entries(opinions?.reduce((acc, opinion) => {
//     if (!acc[opinion.category]) {
//       acc[opinion.category] = [];
//     }
//     acc[opinion.category].push(opinion);
//     return acc;
//   }, {})).map(([category, opinions]) => (
//     <div key={category}>
//       <h4 style={{ fontWeight: "bold" }}>{category}</h4>
//       {opinions.map(opinion => (
//         <div key={opinion.id} style={{ border: "10px solid black", padding: "1em", margin: "1em 0" }}>
//           <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
//             <h5 className="text-capitalize" style={{ textDecoration: "underline", wordBreak: "break-word" ,whiteSpace: "pre-line" }}>
//               {opinion.title}
//             </h5>
//             <h6 style={{ fontWeight: "normal", wordBreak: "break-word",whiteSpace: "pre-line" }} className="text-capitalize text-left">
//               {opinion.body}
//             </h6>
//             <h6 style={{ fontSize: "smaller", fontWeight: "lighter", wordBreak: "break-word", textAlign:"right" }}>
//               Last Updated: {opinion.updatedAt}
//             </h6>
//           </Link>
//         </div>
//       ))}
//     </div>
//   ));

//   return (
//     <>
//       {showAlert && (
//         <Alert
//           type={alertType}
//           message={alertMessage}
//           onClose={handleHideAlert}
//         />
//       )}
//       <div className="container" style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}>
//         <div className="row justify-content-left">
//           <div className="col-sm-8">
//             <div className="d-flex flex-column align-items-left">
//               <h2 style={{ fontWeight: "bolder" }}>OPINIONS</h2>
//             </div>
//           </div>

//           <div className="row justify-content-left">
//             <div className="col-sm-8 text-left">
//               <div className="d-flex flex-column align-items-left" style={{ width: '100%', margin: '0 auto' }}>
//                 {isAuthenticated && loginToken ? (
//                   opinionBlocks.length > 0 ? (
//                     opinionBlocks
//                   ) : (
//                     <div className="text-left">
//                       <h5>No Opinions available.</h5>
//                     </div>
//                   )
//                 ) : (
//                   <div className="text-left">
//                     <h5>Please consider logging in when the data loads.</h5>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <Footer />
//     </>
//   );
// };

// export default OpinionsList;

