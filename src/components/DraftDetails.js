import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpClient from "../http-common.js";
import Footer from "./Footer.js";
import AuthContext from "./shared/AuthContext.js";
import "../Alert.css";
import Alert from "./Alert.js";


const DraftDetails = () => {
    const { loginToken,username} = useContext(AuthContext);
    const { id } = useParams();
    const [currentDraft, setCurrentDraft] = useState(null);
    const [alert, setAlert] = useState(null); // Added alert state
    const navigate = useNavigate();

    // Read
    const getDraft = async (id) => {
        const headers = {
            "loginToken": loginToken,
        };

        try {
            const response = await httpClient.get(`/forum/drafts/${id}`, { withCredentials: true, headers });
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    // Delete
    const removeDraft = async (id) => {
        setAlert({
            type: "decision",
            message: "Are you sure you want to delete this draft?",
            onConfirm: async () => {
                const headers = {
                    "loginToken": loginToken,
                };
                try {
                    const response = await httpClient.delete(`/forum/drafts/${id}`, { withCredentials: true, headers });
                    if (response.status === 204) {
                        setAlert({
                            type: "notification",
                            message: "Deleted!",
                            onClose: () => navigate("/collaborator/dashboard"),
                        });
                    }
                    return response;
                } catch (error) {
                    console.log(error);
                    setAlert({
                        type: "notification",
                        message: "Either 1. Only the initial author can modify the content, 2. An unknown loading bug. Come back later!",
                        onClose: () => navigate("/collaborator/dashboard"),
                    });
                }
            },
            onCancel: () => { },
        });
    };

    //post   
    const postDraftAsOpinion = async (id) => {
        try {
            const draftResponse = await httpClient.get(`/forum/drafts/${id}`, {
                withCredentials: true,
                headers: {
                    "loginToken": loginToken,
                },
            });

            if (draftResponse.status === 200) {
                const draftData = draftResponse.data;

                const opinionData = {
                    id: draftData.id,
                    updatedAt: new Date(draftData.updatedAt).toUTCString(),
                    createdAt: new Date(draftData.createdAt).toUTCString(),
                    collaborator_name: draftData.collaboratorName,
                    category: draftData.category,
                    body: draftData.body,
                    title: draftData.title,
                    country: draftData.country,
                    city: draftData.city,
                };

                const opinionResponse = await httpClient.post("/forum/opinions", opinionData, {
                    withCredentials: true,
                    headers: {
                        "loginToken": loginToken,
                    },
                });

                if (opinionResponse.status === 201) {
                    setAlert({
                        type: "notification",
                        message: "Posted Successfully as Opinion!",
                        onClose: () => navigate("/collaborator/dashboard"),
                      });
                }
            }
        } catch (error) {
            console.log(error);
            setAlert({
                type: "notification",
                message: "Either 1. Only the initial author can modify the content, 2. An unknown loading bug. Come back later!",
                onClose: () => navigate("/forum/opinions"),
              });
        }
    };


    //Post As Opinion
    const handlePost = () => {
        postDraftAsOpinion(id);

    };

    const handleDelete = () => {
        removeDraft(id);
    };

    const handleEdit = () => {
        navigate(`/forum/drafts/edit/${id}`);
    };

    const stayOnPage = () => {
        navigate(`/forum/drafts/${id}`);
    };

    useEffect(() => {
        stayOnPage();
    }, []);



    useEffect(() => {
        getDraft(id)
            .then((response) => {
                const message = response.status;
                const draftData = response.data;
                const updatedAt = new Date(draftData.updatedAt).toUTCString();
                const createdAt = new Date(draftData.createdAt).toUTCString();

                setCurrentDraft({
                    id: draftData.id,
                    updatedAt,
                    createdAt,
                    collaborator_name: username,
                    category: draftData.category,
                    body: draftData.body,
                    title: draftData.title,
                    country: draftData.country,
                    city: draftData.city,
                });

                if (message === 204) {
                    setAlert({
                        type: "notification",
                        message: "Apologies. This draft is deleted.",
                        onClose: () => navigate("/collaborator/dashboard"),
                    });
                    return;
                } else if (message === 403) {
                    setAlert({
                        type: "notification",
                        message: "Sorry, you are not authorized to see the content.",
                        onClose: () => navigate("/about"),
                    });
                    return;
                } else if (message === 500) {
                    setAlert({
                        type: "notification",
                        message: "Server-side issues. We'll try to fix it asap.",
                        onClose: () => navigate("/about"),
                    });
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                navigate("/about");
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
                        {currentDraft && (
                            <div style={{ width: "100%", paddingLeft: "0" }}>
                                <div style={{ border: "10px solid black", padding: "1em", margin: "1em 0" }}>
                                    <article>
                                        <h5 className="text-capitalize " style={{ wordBreak: "break-word" }}>
                                            {currentDraft.title}
                                        </h5>
                                        <div className="my-3" style={{ marginBottom: "0.5em", fontWeight: "bolder" }}>
                                            <span className="text-capitalize" style={{ wordBreak: "break-word" }}>
                                                {currentDraft.category}
                                            </span>
                                        </div>
                                        <div className="my-3" style={{ marginBottom: "0.5em", wordBreak: "break-word" }}>
                                            {currentDraft.body}
                                        </div>


                                        <br/><br/>
                                        {currentDraft.country || currentDraft.city ? (
                                            <div className="my-3" style={{ marginBottom: "0.5em", wordBreak: "break-word", textAlign: "right", fontSize: "smaller" }}>
                                                inspired at <span style={{ fontWeight: "bolder" }}>{currentDraft.country}, {currentDraft.city}</span>
                                            </div>
                                        ) : null}

                                        <div className="my-3" style={{ marginBottom: "0.5em" }}>
                                            <h6 style={{ fontWeight: "lighter", fontSize: "smaller", textAlign: "right" }}>
                                                Last Updated: {new Date(currentDraft.updatedAt).toLocaleDateString()}
                                            </h6>
                                        </div>
                                    </article>
                                    <button onClick={handlePost} style={{ backgroundColor: "black", color: "white", borderRadius: "3px" }}>
                                        Post As Opinion
                                    </button>
                                    <button onClick={handleEdit} className="ms-3" style={{ backgroundColor: "black", color: "white", borderRadius: "3px" }}>
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
};

export default DraftDetails;