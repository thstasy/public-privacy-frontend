// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import AuthContext from "./shared/AuthContext.js";
// import httpClient from "../http-common.js";
// import "../../src/App.css";
// import Footer from "../components/Footer.js";
// import Alert from "./Alert.js"
// import axios from 'axios';


// const AddDraft = () => {

//   const hasLoginToken = document.cookie.includes("loginToken");

//   const handleShowAlert = (message, type) => {
//     setAlertMessage(message);
//     setAlertType(type);
//     setShowAlert(true);
//   };

//   const closeAlert = () => {
//     setShowAlert(false);
//   };

//   const navigate = useNavigate();
//   const location = useLocation();
//   const draftData = location?.state?.draftData;

//   console.log("draftData", draftData);

//   // State variables to store form data
//   const { logOut, loginToken, dashboardToken, isAuthenticated } = useContext(AuthContext);
//   const [title, setTitle] = useState('');
//   const [collaboratorName, setCollaboratorName] = useState("");
//   const [body, setBody] = useState("");
//   const [category, setCategory] = useState("gender equality");
//   const [createdAt, setCreatedAt] = useState("");
//   const [updatedAt, setUpdatedAt] = useState("");
//   const [remainingCharacters, setRemainingCharacters] = useState(5000);
//   const [errors, setErrors] = useState(false);

//   //get the geonames data
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState('');

//   const [alreadyChosenCountry, setAlreadyChosenCountry] = useState('');
//   const [alreadyChosenCity, setAlreadyChosenCity] = useState('');

//   //for alert
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("");
//   const [showAlert, setShowAlert] = useState(false);

//   // Get the draft ID from the URL parameters
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       fetchExistingDraft(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (body !== undefined) {
//       setRemainingCharacters(5000 - body.length);
//     }
//   }, [body]);

//   //get the geonames data

//   ///these are buttons!
//   const handleCountryChange = event => {
//     setSelectedCountry(event.target.value);
//     setSelectedCity('');
//   };

//   const handleCityChange = event => {
//     setSelectedCity(event.target.value);
//   };

//   useEffect(() => {
//     axios.get('https://secure.geonames.org/countryInfoJSON?username=stasy')
//       .then(response => {
//         setCountries(response.data.geonames);
//       })
//       .catch(error => {
//         console.error('Error fetching countries:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       const countryData = countries.find(country => country.countryName === selectedCountry);
//       if (countryData) {
//         axios.get(`https://secure.geonames.org/searchJSON?country=${countryData.countryCode}&username=stasy`)
//           .then(response => {
//             setCities(response.data.geonames);
//           })
//           .catch(error => {
//             console.error('Error fetching cities:', error);
//           });
//       }
//     }
//   }, [selectedCountry, countries]);


//   const fetchExistingDraft = async (draftId) => {
//     try {
//       if (loginToken) {
//         const headers = {
//           'Content-Type': 'application/json',
//         };

//         const data = {
//           loginToken: loginToken,
//         };

//         const response = await httpClient.get(`/forum/drafts/${draftId}`, data, {
//           withCredentials: true,
//           headers,
//         });

//         const draftData = response.data;
//         setTitle(draftData.title);
//         setBody(draftData.body);
//         setCategory(draftData.category);
//         setCreatedAt(draftData.createdAt);
//         setUpdatedAt(draftData.updatedAt);
//         setCollaboratorName(draftData?.collaboratorName);
//         setAlreadyChosenCountry(draftData?.country);
//         setAlreadyChosenCity(draftData?.city);

//       } else {
//         setAlertMessage("Apologies. You are not authorized to edit the content.");
//         setAlertType("notification");
//         setShowAlert(true);
//         navigate("/about");
//         return null
//       }
//     } catch (error) {
//       console.error("Error while fetching draft data:", error);
//       navigate("/about");
//     }
//   };

//   const saveDraft = (e) => {
//     e.preventDefault();

//     if (!title || !body) {
//       setErrors(true);
//       return;
//     }

//     let draft = {
//       title,
//       body,
//       category,
//       id,
//       collaboratorName,
//       createdAt,
//       updatedAt,
//       country: selectedCountry,
//       city: selectedCity
//     };

//     if (id) {
//       updateDraft(draft)
//         .then((response) => {
//           if (response) {
//             navigate("/collaborator/dashboard");
//             return;
//           } else {
//             navigate("/collaborator/dashboard");
//             return;
//           }
//         })
//         .catch((error) => {
//           if (error.message === 403) {
//             setAlertMessage("Only the initial author could modify the content.");
//             setAlertType("notification");
//             setShowAlert(true);
//             navigate("/collaborator/dashboard");
//             return;
//           } else {

//             console.log(error.message);
//             console.log(error);

//             setAlertMessage("Apologies. Server-side issues. We'll fix it asap.");
//             setAlertType("notification");
//             setShowAlert(true);
//             navigate("/collaborator/dashboard");
//             return;
//           }
//         });
//     } else {
//       createDraft(draft)
//         .then((response) => {
//           if (response && response.status === 201) {
//             setAlertMessage("Draft created successfully!");
//             setAlertType("notification");
//             setShowAlert(true);
//             navigate("/collaborator/dashboard");
//             return;
//           }
//         })
//         .catch((error) => {
//           console.log(error);

//           setAlertMessage("Apologies. Server-side issues. We'll fix it asap.");
//           setAlertType("notification");
//           setShowAlert(true);
//           navigate("/collaborator/dashboard");
//           return;
//         }
//         );
//     }
//   };

//   // Create a new draft ==> publish as an opinion or keep editing?
//   const createDraft = async (data) => {
//     try {
//       if (isAuthenticated) {
//         const headers = {
//           "loginToken": loginToken,
//         };
//         const response = await httpClient.post("/forum/drafts", data, {
//           withCredentials: true,
//           headers,
//         });
//         navigate("/collaborator/dashboard");
//         return response;
//       } else {
//         setAlertMessage("Oops, loginToken expired. Please login again.");
//         setAlertType("notification");
//         setShowAlert(true);
//         logOut();
//         return;
//       }
//     } catch (error) {
//       setAlertMessage(`Error while making the POST request: Create draft - ${error}`);
//       setAlertType("notification");
//       setShowAlert(true);
//       return;
//     }
//   };

//   const updateDraft = async (data) => {
//     try {
//       if (isAuthenticated) {
//         const id = data.id;
//         const headers = {
//           "loginToken": loginToken,
//         };
//         const preload_response = await httpClient.get(`/forum/drafts/${id}`, {
//           withCredentials: true,
//           headers,
//         });


//         if (preload_response && preload_response.status === 200) {
//           navigate(`/forum/drafts/edit/${id}`);
//           try {
//             const update_response = await httpClient.put(`/forum/drafts`, data, {
//               withCredentials: true,
//               headers,
//             });

//             if (update_response && update_response.status === 200 || update_response && update_response.status === 201) {

//               setAlertMessage("Draft updated successfully!");
//               setAlertType("notification");
//               setShowAlert(true);
//               navigate("/collaborator/dashboard");
//               return;

//             } else {

//               setAlertMessage("Error updating the draft");
//               setAlertType("notification");
//               setShowAlert(true);
//               logOut();
//               return;
//             }
//           } catch (error) {
//             setAlertMessage("Only the initial author is able to edit the content.");
//             setAlertType("notification");
//             setShowAlert(true);
//             logOut(); // Log out the user
//             return; // Return null or a proper response if needed
//           }
//         } else {
//           setAlertMessage("Having issues loading the data");
//           setAlertType("notification");
//           setShowAlert(true);
//           logOut(); // Log out the user
//           return; // Return null or a proper response if needed
//         }
//       } else {
//         setAlertMessage("Oops, loginToken expired. Please login again");
//         setAlertType("notification");
//         setShowAlert(true);
//         logOut(); // Log out the user
//         return; // Return null or a proper response if needed
//       }
//     } catch (error) {
//       setAlertMessage(`Error while making the PUT request: Update draft - ${error}`);
//       setAlertType("notification");
//       setShowAlert(true);
//       logOut(); // Log out the user
//       return;
//     }
//   };


//   useEffect(() => {
//     if (draftData) {
//       console.log("draftData", draftData);
//       setTitle(draftData.title);
//       setBody(draftData.body);
//       setCategory(draftData.category);
//       setCreatedAt(draftData.createdAt);
//       setUpdatedAt(draftData.updatedAt);
//       setCollaboratorName(draftData.collaboratorName);

//       setAlreadyChosenCountry(draftData.country);
//       setAlreadyChosenCity(draftData.city);
//     } else if (id) {
//       fetchExistingDraft(id);
//     }
//   }, [id, draftData]);
import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from "./shared/AuthContext.js";
import httpClient from "../http-common.js";
import "../../src/App.css";
import Footer from "../components/Footer.js";
import Alert from "./Alert.js"
import axios from 'axios';


const AddDraft = () => {
  const hasLoginToken = document.cookie.includes("loginToken");

  // State variables to store form data
  const { logOut, loginToken, dashboardToken, isAuthenticated } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [collaboratorName, setCollaboratorName] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("gender equality");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(5000);
  const [errors, setErrors] = useState(false);

  // Get the draft ID from the URL parameters
  const { id } = useParams();

  // State for geonames data
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [alreadyChosenCountry, setAlreadyChosenCountry] = useState('');
  const [alreadyChosenCity, setAlreadyChosenCity] = useState('');

  // State for displaying alerts
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const draftData = location?.state?.draftData;

  useEffect(() => {
    if (id) {
      fetchExistingDraft(id);
    }
  }, [id]);

  useEffect(() => {
    if (body !== undefined) {
      setRemainingCharacters(5000 - body.length);
    }
  }, [body]);

  // Fetch geonames data
  const handleCountryChange = event => {
    setSelectedCountry(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = event => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    axios.get('https://secure.geonames.org/countryInfoJSON?username=stasy')
      .then(response => {
        setCountries(response.data.geonames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryData = countries.find(country => country.countryName === selectedCountry);
      if (countryData) {
        axios.get(`https://secure.geonames.org/searchJSON?country=${countryData.countryCode}&username=stasy`)
          .then(response => {
            setCities(response.data.geonames);
          })
          .catch(error => {
            console.error('Error fetching cities:', error);
          });
      }
    }
  }, [selectedCountry, countries]);

  const fetchExistingDraft = async (draftId) => {
    try {
      if (loginToken) {
        const headers = {
          'Content-Type': 'application/json',
        };

        const data = {
          loginToken: loginToken,
        };

        const response = await httpClient.get(`/forum/drafts/${draftId}`, data, {
          withCredentials: true,
          headers,
        });

        const draftData = response.data;
        setTitle(draftData.title);
        setBody(draftData.body);
        setCategory(draftData.category);
        setCreatedAt(draftData.createdAt);
        setUpdatedAt(draftData.updatedAt);
        setCollaboratorName(draftData?.collaboratorName);
        setAlreadyChosenCountry(draftData?.country);
        setAlreadyChosenCity(draftData?.city);

      } else {
        handleShowAlert("Apologies. You are not authorized to edit the content.", "notification");
        navigate("/about");
        return null;
      }
    } catch (error) {
      console.error("Error while fetching draft data:", error);
      navigate("/about");
    }
  };

  const saveDraft = (e) => {
    e.preventDefault();

    if (!title || !body) {
      setErrors(true);
      return;
    }

    let draft = {
      title,
      body,
      category,
      id,
      collaboratorName,
      createdAt,
      updatedAt,
      country: selectedCountry,
      city: selectedCity
    };

    if (id) {
      updateDraft(draft)
        .then((response) => {
          if (response) {
            handleShowAlert("Draft updated successfully!", "notification");
            navigate("/collaborator/dashboard");
            return;
          } else {
            handleShowAlert("Error updating the draft", "notification");
            navigate("/collaborator/dashboard");
            return;
          }
        })
        .catch((error) => {
          if (error.message === 403) {
            handleShowAlert("Only the initial author could modify the content.", "notification");
            navigate("/collaborator/dashboard");
            return;
          } else {
            handleShowAlert("Apologies. Server-side issues. We'll fix it asap.", "notification");
            navigate("/collaborator/dashboard");
            return;
          }
        });
    } else {
      createDraft(draft)
        .then((response) => {
          if (response && response.status === 201) {
            handleShowAlert("Draft created successfully!", "notification");
            navigate("/collaborator/dashboard");
            return;
          }
        })
        .catch((error) => {
          handleShowAlert("Apologies. Server-side issues. We'll fix it asap.", "notification");
          navigate("/collaborator/dashboard");
          return;
        });
    }
  };

  // Create a new draft ==> publish as an opinion or keep editing?
  const createDraft = async (data) => {
    try {
      if (isAuthenticated) {
        const headers = {
          "loginToken": loginToken,
        };
        const response = await httpClient.post("/forum/drafts", data, {
          withCredentials: true,
          headers,
        });
        navigate("/collaborator/dashboard");
        return response;
      } else {
        handleShowAlert("Oops, loginToken expired. Please login again.", "notification");
        logOut();
        return;
      }
    } catch (error) {
      handleShowAlert(`Error while making the POST request: Create draft - ${error}`, "notification");
      return;
    }
  };

  const updateDraft = async (data) => {
    try {
      if (isAuthenticated) {
        const id = data.id;
        const headers = {
          "loginToken": loginToken,
        };
        const preload_response = await httpClient.get(`/forum/drafts/${id}`, {
          withCredentials: true,
          headers,
        });

        if (preload_response && preload_response.status === 200) {
          navigate(`/forum/drafts/edit/${id}`);
          try {
            const update_response = await httpClient.put(`/forum/drafts`, data, {
              withCredentials: true,
              headers,
            });

            if (update_response && (update_response.status === 200 || update_response.status === 201)) {
              handleShowAlert("Draft updated successfully!", "notification");
              navigate("/collaborator/dashboard");
              return;
            } else {
              handleShowAlert("Error updating the draft", "notification");
              logOut();
              return;
            }
          } catch (error) {
            handleShowAlert("Only the initial author is able to edit the content.", "notification");
            logOut(); // Log out the user
            return;
          }
        } else {
          handleShowAlert("Having issues loading the data", "notification");
          logOut(); // Log out the user
          return;
        }
      } else {
        handleShowAlert("Oops, loginToken expired. Please login again", "notification");
        logOut(); // Log out the user
        return;
      }
    } catch (error) {
      handleShowAlert(`Error while making the PUT request: Update draft - ${error}`, "notification");
      logOut(); // Log out the user
      return;
    }
  };

  useEffect(() => {
    if (draftData) {
      setTitle(draftData.title);
      setBody(draftData.body);
      setCategory(draftData.category);
      setCreatedAt(draftData.createdAt);
      setUpdatedAt(draftData.updatedAt);
      setCollaboratorName(draftData.collaboratorName);
      setAlreadyChosenCountry(draftData.country);
      setAlreadyChosenCity(draftData.city);
    } else if (id) {
      fetchExistingDraft(id);
    }
  }, [id, draftData]);

  return (
    <>
    {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="container" >
        <div>
          <div className="row justify-content-left">
            <div className="col-sm-8">
              <div className="d-flex flex-column align-items-left">
                <h2 style={{ margin: "0em", fontWeight: "bolder" }}>{id ? "UPDATE A DRAFT" : "CREATE A DRAFT"}</h2>
                {errors && <span style={{ color: 'red', fontStyle: 'italic' }}>Please enter the mandatory fields</span>}
              </div>
            </div>
          </div>

          <div className="row justify-content-left">
            <div className="col-sm-8">
              <form>
                <div className="form-group" style={{ marginBottom: '0.75em' }} >
                  <label htmlFor="title">
                    Draft Title: <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="body">
                    Draft Description: <sup>*</sup>
                  </label>
                  <textarea
                    name="body"
                    className="form-control"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10} 
                    required
                  ></textarea>
                  <small>{remainingCharacters} characters remaining</small>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="category">Draft Category: </label>
                  <select
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {/* <option value="">Select a category</option> */}
                    <option value="gender equality">Gender Equality</option>
                    <option value="health care">Health Care</option>
                    <option value="educational system">Educational System</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="country">Draft inspired in: </label>
                  <select
                    id="country"
                    className="form-control"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {/* <option value=""> select a country </option> */}
                    {countries.map(country => (
                      <option key={country.geonameId} value={country.countryName}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="city">Approximately at: </label>
                  <select
                    id="city"
                    className="form-control"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    {/* <option value="">select a city </option> */}
                    {cities.map(city => (
                      <option key={city.geonameId} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />

                <div className="text-left" style={{ marginBottom: '0.75em' }}>
                  <button
                    type="button"
                    onClick={(e) => { saveDraft(e); }}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "5px",
                      marginRight: "10px" // Add some spacing between buttons
                    }}
                  >
                    {id ? `Share as Opinion` : `Save as Draft`}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      saveDraft(e); // Use the saveDraft function for drafts
                    }}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px',
                    }}
                  >
                    {id ? `Save as Draft` : `Share as Opinion`}
                  </button>
                </div>
              </form>
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
};

export default AddDraft;