import React, { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "./shared/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js";
import Alert from "./Alert.js"; // Import your Alert component here

const Login = () => {
  const {LogIn, LogOut} = useContext(AuthContext);

  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("notification");

  const handleShowAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  const loginSubmit = async () => {
    try {
      let payload = {
        email: email.current.value,
        password: password.current.value,
      };

      if (document.cookie.includes("loginToken")) {
        handleShowAlert("You are already logged in.", "notification"); // Change "error" to "notification"
        navigate("/about");
        return;
      } else {
        await LogIn(payload);
        navigate("/collaborator/dashboard");
        setTimeout(LogOut, 3600000);
        return;
      }
    } catch (error) {
      console.log(error);
      handleShowAlert("Oops! The input is incorrect. Please try again.", "notification"); // Change "error" to "notification"
    } finally {
      // This will ensure the alert is shown only if there's an error
      if (!document.cookie.includes("loginToken")) {
        navigate("/about");
      }
    }
  };

  const resetPassword = async () => {
    navigate("/collaborator/resetPassword1");
  };

  return (
    <>
      {/* Display Alert */}
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={handleHideAlert}
        />
      )}
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-sm-8 text-left">
            <h2 className="text-left" style={{ fontWeight: "bolder" }}>LOGIN</h2>
          </div>
        </div>

        <div className="row justify-content-left">
          <div className="col-sm-8">
            <Form.Group className="mb-3" controlid="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlid="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={password} />
            </Form.Group>
            <div className="text-left">
              <Button
                variant="primary"
                type="button"
                onClick={loginSubmit}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  outline: "none",
                  marginRight: "2em",
                }}
              >
                Login
              </Button>

              <Button
                variant="primary"
                type="button"
                onClick={resetPassword}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  outline: "none",
                }}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </div>
        <br /><br />
        <div className="row justify-content-left">
          <div className="col-sm-8 text-left">
            <h2 className="text-left" style={{ fontWeight: "bolder" }}>FIRST TIME HERE?</h2>
            <h5><a href="https://public-privacy.xyz/#/collaborator/register" style={{ textDecoration: "underline", color:"black",fontSize:"smaller"  }} >Register</a> </h5>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default Login;



