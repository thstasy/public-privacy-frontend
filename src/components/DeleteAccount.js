
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./shared/AuthContext.js";
import httpClient from "../http-common.js";
import Footer from "../components/Footer.js";
import useAuthContextLoader from "./shared/useAuthContext.js";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert.js"; // Make sure to provide the correct path to the Alert.js component
import "../Alert.css"; // Make sure to provide the correct path to the Alert.css file

const DeleteAccount = () => {
  const isAuthContextLoaded = useAuthContextLoader();
  const { username, LogOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const navigate = useNavigate();

  const deleteSubmit = async () => {
    const username = username;

    try {
      const response = await httpClient.delete(`/collaborator/deleteAccount?username=${username}`, { withCredentials: true });

      if (response.status === 200 || response.status === 204) {
        setShowDeleteAlert(true);

        setTimeout(() => {
          setShowDeleteAlert(false);
          LogOut();
        }, 1000);
      }
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    if (isAuthContextLoaded) {
      setIsLoading(false);
    }
  }, [isAuthContextLoaded]);

  return (
    <>
      {showErrorAlert && (
        <Alert
          message="Sorry. The account is not finally vanished. Please try again."
          type="notification"
          onClose={() => {
            setShowErrorAlert(false);
            navigate("/");
          }}
        />
      )}
      <div className="container" style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}>
        {isLoading ? (
          <div className="row justify-content-left">
            <div className="col-sm-8">
              <div className="d-flex flex-column align-items-left">
                <h2 style={{ color: "black", fontWeight: "bolder" }}>LOADING...</h2>
                <div className="dots">
                  <div className="loader"></div>
                  <div className="loader"></div>
                  <div className="loader"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-left">
            <div className="col-sm-8">
              <div className="d-flex flex-column align-items-left" style={{ width: "100%", margin: "0 auto" }}>
                <h2 style={{ margin: "0 0 0.5em 0", fontWeight: "bolder" }}>DELETE ACCOUNT</h2>
                <h6 style={{ margin: "0.5em 0 2em 0" }}>
                  Once deleted, all the data will be removed from the database.
                </h6>
                <button
                  type="submit"
                  onClick={deleteSubmit}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "5px",
                    textAlign: "center",
                    float: "left",
                    width: "4em",
                    padding: "1px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showDeleteAlert && (
        <Alert
          message="The account has been deleted. Before you quit, would you mind telling the reason for leaving?"
          type="notification"
          onClose={() => {
            setShowDeleteAlert(false);
            navigate("/");
          }}
        />
      )}
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default DeleteAccount;


