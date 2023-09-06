import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import httpClient from "../../http-common.js";
import Alert from "../../components/Alert.js"; // Update the path to your Alert.js file

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const hasLoginToken = document.cookie.includes("loginToken");


  const [isAuthenticated, setAuthentication] = useState(hasLoginToken);
  const [username, setUsername]=useState();
  const [email, setEmail]=useState();
  const [loginToken, setLoginToken] = useState(null);
  const [basicUserInfo, setBasicUserInfo] = useState();
  const [opinionsByUser, setOpinionsByUser] = useState([]);
  const [draftsByUser, setDraftsByUser] = useState([]);
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("notification");
  const [alertCallbacks, setAlertCallbacks] = useState({});

  const handleShowAlert = (message, type = "notification", callbacks = {}) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertCallbacks(callbacks);
    setShowAlert(true);
  };
  
// const [showDecisionAlert, setShowDecisionAlert] = useState(false);
// const [decisionAlertMessage, setDecisionAlertMessage] = useState("");
// const [decisionAlertCallbacks, setDecisionAlertCallbacks] = useState({});

// const handleShowDecisionAlert = (message, callbacks = {}) => {
//   setDecisionAlertMessage(message);
//   setDecisionAlertCallbacks(callbacks);
//   setShowDecisionAlert(true);
// };

// const handleHideDecisionAlert = () => {
//   setShowDecisionAlert(false);
//   setDecisionAlertMessage("");
//   setDecisionAlertCallbacks({});
// };


  const handleHideAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
    setAlertType("notification");
    setAlertCallbacks({});
  };

  const updateAuthenticationStatus = (isAuthenticated) => {
    setAuthentication(isAuthenticated);
  };

  const AccessDashboard = async () => {

    console.log("hey I am in AccessDashboard in AuthContext.");
    try {
      const headers = {
        "loginToken": loginToken,
      };

      const apiResponse = await httpClient.get("/collaborator/dashboard", { withCredentials: true, headers });
      const responseBody = apiResponse.data;
      const opinionsByUser = responseBody.opinionsByUser;
      const draftsByUser = responseBody.draftsByUser;

      console.log(opinionsByUser);
      console.log(draftsByUser);

      setOpinionsByUser(responseBody.opinionsByUser);
      setDraftsByUser(responseBody.draftsByUser);
    }
    catch (error) {
      console.error(`${error}` + 'in Auth context 62.');
      handleShowAlert("An error occurred while accessing the dashboard.", "notification");
    }
  };

  const LogIn = async (payload) => {
    if (document.cookie.includes("loginToken")) {
      handleShowAlert("You are already logged in.");
      return;
    } else {
      try {
        const apiResponse = await httpClient.post("/collaborator/login", payload, {
          withCredentials: true,
        });

        if (apiResponse.status !== 200) {
          handleShowAlert("Oops, the input is incorrect. Please try again.", "notification");
          document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          navigate("/about");
        } else {

          const loginToken = apiResponse.data;
          setLoginToken(loginToken);

      // Decode the token to retrieve claims
          const decodedToken = jwt_decode(loginToken);
          const username = decodedToken.username;
          console.log(username);
          const email = decodedToken.sub; // sub represents the subject claim
          console.log(email);

          setUsername(username);
          setEmail(email);

          setTimeout(function () {
            handleShowAlert("Login Successfully!", "notification");
          }, 500);

          const expirationTime = new Date();
          expirationTime.setTime(expirationTime.getTime() +  7 * 24 * 60 * 60 * 1000); // 1week from now
          const cookieOptions = `Expires=${expirationTime.toUTCString()}`;
          document.cookie = `loginToken=${loginToken};${cookieOptions}`;
          setAuthentication(true);
          navigate('/collaborator/dashboard');
        }
      } catch (error) {
        handleShowAlert("The input is incorrect. Please try again.", "notification");
        console.error("Error logging in at AuthContext:", error);
      }
    }
  };


  const LogOut = () => {
    document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setAuthentication(false);
    setBasicUserInfo(null);

    handleShowAlert("Logged Out. Login Token Devalidated.", "notification");
    setTimeout(() => {
      navigate("/about");
    }, 1000); 
  };

  // const LogOut = async (handleShowAlert, handleShowDecisionAlert) => {
  //   handleShowDecisionAlert(
  //     "Do you want to save drafts or post something before the token expires?",
  //     {
  //       onConfirm: () => {
  //         const extendToken = () => {
  //           const tokenExpiryDate = new Date();
  //           tokenExpiryDate.setTime(tokenExpiryDate.getTime() + 10 * 60 * 1000); // Extend by 10 minutes
  //           document.cookie = `loginToken=${loginToken}; expires=${tokenExpiryDate.toUTCString()};`;
    
  //           handleShowAlert("Token expires in 10 minutes, so you can save drafts :)", "notification");
  //         };
    
  //         extendToken();
  //       },
  //       onCancel: () => {
  //         document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //         setAuthentication(false);
  //         setBasicUserInfo(null);
    
  //         handleShowAlert("Logged Out. Login Token Devalidated.", "notification");
  //         setTimeout(() => {
  //           navigate("/about");
  //         }, 1000);
  //       },
  //     }
  //   );
  // };
  
  const handleNavbarReload = () => {
    const navbarLinks = document.querySelectorAll(".navbar-link");
    navbarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        window.location.reload();
      });
    });
  };

  useEffect(() => {
    handleNavbarReload();
  }, [hasLoginToken]);

  return (
    <div>
      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={handleHideAlert}
          onConfirm={alertCallbacks.onConfirm}
          onCancel={alertCallbacks.onCancel}
        />
      )}

      <AuthContext.Provider
        value={{
          LogIn,
          AccessDashboard,
          opinionsByUser,
          draftsByUser,
          isAuthenticated,
          basicUserInfo,
          username,
          email,
          LogOut, setAuthentication, setBasicUserInfo,loginToken,
          handleShowAlert, 
          updateAuthenticationStatus, 
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContext;