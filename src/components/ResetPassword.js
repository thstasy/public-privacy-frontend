import React, { useRef, useState } from "react";
import httpClient from "../http-common.js";
import '../../src/App.css';
import Footer from "../components/Footer.js";
import Alert from "./Alert.js"; 

const ResetPassword = () => {
  const email = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("notification");

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: email.current.value,
    };

    try {
      const response = await httpClient.post(`/collaborator/resetPassword2`, payload, { withCredentials: true });

      if (response.status === 200) {
        setAlertMessage(response.data);
      } else {
        setAlertMessage(response.data);
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("An email has been sent to the address. Please proceed with the instruction.");
    }

    setShowAlert(true);
  };

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <Alert
          onClose={handleHideAlert}
          message={alertMessage}
          type={alertType}
        />
      )}

      <div className="container">
        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left" style={{ width: '100%'}}>
              <h2 style={{ margin: '0 0 0.5em 0', fontWeight: "bolder" }}>RESET PASSWORD</h2>
              <h6 style={{ margin: '0.5em 0 2em 0' }}>
                An email for resetting a new password will be sent to the registered email address. Please reset the password within 10 minutes.
              </h6>

              <div className="row justify-content-left">
                <div className="col-sm-8">
                  <form onSubmit={resetPasswordSubmit} style={{ textAlign: "left" , marginBottom:"0.75em", }}>
                    <div className="mb-3 d-flex align-items-center" controlid="formEmail" style={{ marginBottom: "1rem" }}>
                      <label style={{ marginRight: "1rem" }}>Email</label>
                      <input type="email" ref={email} />
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "5px",
                        float: "left",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default ResetPassword;


