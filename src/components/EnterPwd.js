import React, { useRef, useState, useContext } from "react";
import AuthContext from "../components/shared/AuthContext.js";
import Footer from "../components/Footer.js";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert.js";
import httpClient from "../http-common.js";
import "../Alert.css";

const EnterPwd = () => {
  const [token, setToken] = useState("");
  const password = useRef("");
  const navigate = useNavigate();
  const { LogOut } = useContext(AuthContext);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      password: password.current.value,
      token: token,
    };

    try {
      const response = await httpClient.post(`/collaborator/resetPassword4`, payload, { withCredentials: true });

      if (response.status === 200) {
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
          LogOut();
        }, 1500);
      }
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert
          message="Password reset successfully! Please log in again with the new password."
          type="notification"
          onClose={() => {
            setShowSuccessAlert(false);
            navigate("/");
          }}
        />
      )}
      {showErrorAlert && (
        <Alert
          message="An error occurred. Please try again."
          type="notification"
          onClose={() => {
            setShowErrorAlert(false);
            navigate("/");
          }}
        />
      )}
      <div className="container" style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}>
        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left" style={{ width: '100%', margin: '0 auto' }}>
              <h2 style={{ margin: '0 0 0.5em 0', fontWeight: "bolder" }}>RESET PASSWORD</h2>
              <h6 style={{ margin: '0.5em 0 2em 0' }}>
                Enter your new password
              </h6>

              <div className="row justify-content-left">
                <div className="col-sm-8">
                  <form onSubmit={resetPasswordSubmit} style={{ textAlign: "left" }}>
                    <div className="mb-3 d-flex align-items-center" controlid="formPassword" style={{ marginBottom: "1rem" }}>
                      <label style={{ marginRight: "1rem", width: 'fit-content', flexShrink: 0 }}>New Password</label>
                      <div className="flex-grow-1 d-flex justify-content-end">
                        <input type="password" ref={password} />
                      </div>
                    </div>

                    <div className="mb-3 d-flex align-items-center" controlid="formToken" style={{ marginBottom: "1rem" }}>
                      <label style={{ marginRight: "1rem", width: 'fit-content', flexShrink: 0 }}>Token</label>
                      <div className="flex-grow-1 d-flex justify-content-end">
                        <input
                          type="text"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "5px",
                        textAlign: "left",
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

export default EnterPwd;
