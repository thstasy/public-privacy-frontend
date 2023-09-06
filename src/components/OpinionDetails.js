import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpClient from "../http-common.js";
import Footer from "../components/Footer.js";
import AuthContext from "./shared/AuthContext.js";
import Alert from "./Alert.js"; // Update the path to your Alert.js file


const OpinionDetails = () => {
  const { loginToken,username} = useContext(AuthContext);
  const { id } = useParams();
  const [currentOpinion, setCurrentOpinion] = useState(null);
  const [alert, setAlert] = useState(null); // Added alert state
  const navigate = useNavigate();

  // Read
  const getOpinion = async (id) => {
    const headers = {
      "loginToken": loginToken,
    };

    try {
      const response = await httpClient.get(`/forum/opinions/${id}`, { withCredentials: true, headers });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const removeOpinion = async (id) => {
    setAlert({
      type: "decision",
      message: "Are you sure you want to delete this opinion?",
      onConfirm: async () => {
        const headers = {
          "loginToken": loginToken,
        };

        try {
          const response = await httpClient.delete(`/forum/opinions/${id}`, { withCredentials: true, headers });
          if (response?.status === 204) {
            setAlert({
              type: "notification",
              message: "Deleted!",
              onClose: () => navigate("/forum/opinions"),
            });
          }
          return response;
        } catch (error) {
          console.log(error);
          setAlert({
            type: "notification",
            message: "Either 1. Only the initial author can modify the content, 2. An unknown loading bug. Come back later!",
            onClose: () => navigate("/forum/opinions"),
          });
          return;
        }
      },
      onCancel: () => { },
    });
  };

  const handleDelete = () => {
    removeOpinion(id);
  };
  const handleEdit = () => {
    navigate(`/forum/opinions/edit/${id}`);
    
  };

  const stayOnPage = () => {
    navigate(`/forum/opinions/${id}`);
  };

  useEffect(() => {
    stayOnPage();
  }, []);

  useEffect(() => {
    getOpinion(id)
      .then((response) => {
        const message = response.status;
        const opinionData = response.data;
        const updatedAt = new Date(opinionData.updatedAt).toUTCString();
        const createdAt = new Date(opinionData.createdAt).toUTCString();

        setCurrentOpinion({
          id: opinionData.id,
          updatedAt,
          createdAt,
          collaborator_name: username,
          category: opinionData.category,
          body: opinionData.body,
          title: opinionData.title,
          country: opinionData.country,
          city: opinionData.city
        });

        if (message === 204) {
          setAlert({
            type: "notification",
            message: "Apologies. This opinion is deleted.",
            onClose: () => navigate("/collaborator/dashboard"),
          });
        } else if (message === 403) {
          setAlert({
            type: "notification",
            message: "Sorry, you are not authorized to see the content.",
            onClose: () => navigate("/about"),
          });
        } else if (message === 500) {
          setAlert({
            type: "notification",
            message: "Server-side issues. We'll try to fix it asap.",
            onClose: () => navigate("/about"),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={alert.onClose}
          onConfirm={alert.onConfirm}
          onCancel={alert.onCancel}
        />
      )}
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-md-8">
            {currentOpinion && (
              <div style={{ width: "100%", paddingLeft: "0" }}>
                <div style={{ border: "10px solid black", padding: "1em", margin: "1em 0" }}>
                  <article>
                    <h5 className="text-capitalize " style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>
                      {currentOpinion.title}
                    </h5>
                    <div className="my-3" style={{ marginBottom: "0.5em", fontWeight: "bolder" }}>
                      <span className="text-capitalize" style={{ wordBreak: "break-word" }}>
                        {currentOpinion.category}
                      </span>
                    </div>
                    <div className="my-3" style={{ marginBottom: "0.5em", wordBreak: "break-word", whiteSpace: "pre-line" }}>
                      {currentOpinion.body}
                    </div>
                    <br/><br/>
                    {currentOpinion.country || currentOpinion.city ? (
                      <div className="my-3" style={{ marginBottom: "0.1em", wordBreak: "break-word", textAlign: "right", fontSize: "smaller", }}>
                        inspired at <span style={{ fontWeight: "bolder" }}>{currentOpinion.country}, {currentOpinion.city}</span>
                      </div>
                    ) : null}
                    <div className="my-3" style={{ marginBottom: "0.5em" }}>
                      <h6 style={{ fontWeight: "lighter", fontSize: "smaller", textAlign: "right" }}>
                        Last Updated: {new Date(currentOpinion.updatedAt).toLocaleDateString()}
                      </h6>
                    </div>
                  </article>
                  <button onClick={handleEdit} style={{ backgroundColor: "black", color: "white", borderRadius: "3px" }}>
                    Edit
                  </button>
                  <button onClick={handleDelete} className="ms-3" style={{ backgroundColor: "black", color: "white", borderRadius: "3px" }}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default OpinionDetails;
