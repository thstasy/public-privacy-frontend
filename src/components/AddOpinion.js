import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./shared/AuthContext.js";
import httpClient from "../http-common.js";
import "../../src/App.css";
import Footer from "../components/Footer.js";
import Alert from "./Alert.js"; // Update the path to your Alert.js file
import axios from 'axios';


const AddOpinion = () => {

  const hasLoginToken = document.cookie.includes("loginToken");
  const { logOut, loginToken } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [collaboratorName, setCollaboratorName] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("gender equality");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [errors, setErrors] = useState(false);
  const { id } = useParams();
  const [remainingCharacters, setRemainingCharacters] = useState(5000);
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const closeAlert = () => {
    setShowAlert(false);
  };
  //get the geonames data
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Belgium');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Leuven');

  const [alreadyChosenCountry, setAlreadyChosenCountry] = useState('');
  const [alreadyChosenCity, setAlreadyChosenCity] = useState('');

  console.log(`hasLoginToken`);
  console.log(hasLoginToken);

  useEffect(() => {
    if (id) {
      fetchExistingOpinion(id);
    }
  }, [id]);

  useEffect(() => {
    if (body !== undefined) {
      setRemainingCharacters(5000 - body.length);
    }
  }, [body]);

  const fetchExistingOpinion = async (opinionId) => {
    try {
      if (hasLoginToken) {    //&&dashboardToken
        const headers = {
          'Content-Type': 'application/json',
        };

        const data = {
          loginToken: loginToken,
        };

        const response = await httpClient.get(`/forum/opinions/${opinionId}`, data, {
          withCredentials: true,
          headers,
        });

        const opinionData = response.data;
        console.log(opinionData);
        setTitle(opinionData.title);
        setBody(opinionData.body);
        setCategory(opinionData.category);
        setCreatedAt(opinionData.createdAt);
        setUpdatedAt(opinionData.updatedAt);
        setCollaboratorName(opinionData.collaboratorName);
        // Add these lines to set the country and city
        setAlreadyChosenCountry(opinionData.country);
        setAlreadyChosenCity(opinionData.city);

      } else {
        setAlertMessage("Apologies. You are not authorized to edit the content.");
        setAlertType("notification");
        setShowAlert(true);
        navigate("/about");
        return;
      }
    } catch (error) {
      console.error("Error while fetching opinion data:", error);
      navigate("/about");
    }
  };

  //////get geonames data
  //get the geonames data

  //these two are buttons!
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


  const createOpinion = async (data) => {
    try {
      if (hasLoginToken) {
        const headers = {
          "loginToken": loginToken,
        };
        const response = await httpClient.post("/forum/opinions", data, {
          withCredentials: true,
          headers,
        });
        return response;
      }
      else {
        setAlertMessage("Oops, loginToken expired. Please login again.");
        setAlertType("notification");
        setShowAlert(true);
        logOut();
        return;
      }
    }
    catch (error) {
      console.error('Error while making the POST request: Create opinion', error);
    }
  };

  const updateOpinion = async (opinion) => {

    console.log("its entering updateOpiion.");
    try {
      
      if (hasLoginToken) {
        const id = opinion.id;
        opinion.title = title;
        opinion.body = body;
        opinion.category = category;
        opinion.country = selectedCountry;
        opinion.city = selectedCity;
  
        console.log("After update:", opinion);
  
        const headers = {
          "loginToken": loginToken,
        };
  
        try {
          console.log("To be update:",opinion);
          const update_response = await httpClient.put(`/forum/opinions`, opinion, {
            withCredentials: true,
            headers,
          });

          console.log(opinion);
  
          if (update_response.status === 200) {
            setAlertMessage('Opinion updated successfully!');
            setAlertType("notification");
            setShowAlert(true);
            navigate("/collaborator/dashboard");
            return;
          } else {
            setAlertMessage(`Error updating the opinion: ${update_response.data}`);
            setAlertType("notification");
            setShowAlert(true);
            navigate("/collaborator/dashboard");
            return;
          }
        } catch (error) {
          setAlertMessage(`Only the initial author is able to edit the content.`);
          setAlertType("notification");
          setShowAlert(true);
          navigate("/collaborator/dashboard");
          return;
        }
      } else {
        setAlertMessage(`Having issues loading the data.`);
        setAlertType("notification");
        setShowAlert(true);
        navigate("/forum/opinions");
        return;
      }
    } catch (error) {
      console.error('Error while making the PUT request: Update opinion', error);
      navigate("/forum/opinions");
    }
  };
  



  const saveOpinion = (e) => {
    e.preventDefault();

    if (!title || !body) {
      setErrors(true);
      return;
    }

    let opinion = {
      title,
      body,
      category,
      id,
      collaboratorName,
      createdAt,
      updatedAt,
      country: selectedCountry, // Include selected country
      city: selectedCity,       // Include selected city
    };

    if (id) {
      updateOpinion(opinion)
        .then((response) => {
          if (response) {
            setAlertMessage(`${response}`);
            setAlertType("notification");
            setShowAlert(true);
            navigate("/forum/opinions");
            return;
          } else {
            setAlertMessage(`${response}`);
            setAlertType("notification");
            setShowAlert(true);
            navigate("/forum/opinions");
            return;
          }
        })
        .catch((error) => {
          if (error.message === 403) {
            setAlertMessage(`${error.message}`);
            setAlertType("notification");
            setShowAlert(true);
            navigate("/forum/opinions");
            return;
          } else {
            setAlertMessage(`Apologies. Server-side issues. We will fix it asap. ${error.message}`);
            setAlertType("notification");
            setShowAlert(true);
            navigate("/forum/opinions");
            return;
          }
        });
    } else {
      createOpinion(opinion)
        .then((response) => {
          if (response && response.status === 201) {
            setAlertMessage(`Opinion shared successfully!`);
            setAlertType("notification");
            setShowAlert(true);
            navigate("/forum/opinions");
            return;
          }
        })
        .catch((error) => {
          console.log(error);

          setAlertMessage(`Apologies. Server-side issues. We'll fix it asap.`);
          setAlertType("notification");
          setShowAlert(true);
          navigate("/forum/opinions");
          return;
        });
    }
  };

  /**same for drafts */
  const saveDraft = () => {
    let draftData = {
      title,
      body,
      category,
      id,
      collaboratorName,
      createdAt,
      updatedAt,
      country: selectedCountry,
      city: selectedCity,
    };

    console.log(draftData);

    // Navigate to the AddDraft page with draft data
    navigate('/forum/drafts/add', { state: { draftData } });
  };


  return (
    <>
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={closeAlert} 
        />
      )}
      <div className="container">
        <div>
          <div className="row justify-content-left">
            <div className="col-sm-8">
              <div className="d-flex flex-column align-items-left">
                <h2 style={{ margin: "0em", fontWeight: "bolder" }}>{id ? "UPDATE AN OPINION" : "SHARE YOUR OPINION"}</h2>
                {errors && <span style={{ color: 'red', fontStyle: 'italic' }}>Please enter the mandatory fields</span>}
              </div>
            </div>
          </div>

          <div className="row justify-content-left">
            <div className="col-sm-8">
              <form style={{ marginBottom: '0.75em' }}>
                <div className="form-group">
                  <label htmlFor="title">
                    Opinion Title: <sup>*</sup>
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
                    Opinion Description: <sup>*</sup>
                  </label>
                  <textarea
                    name="body"
                    className="form-control"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={20} 
                  ></textarea>
                  <small>{remainingCharacters} characters remaining</small>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="category">Opinion Category:  <sup>*</sup></label>
                  <select
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="gender equality">Gender Equality</option>
                    <option value="health care">Health Care</option>
                    <option value="educational system">Educational System</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="country">Opinion inspired in:</label>
                  <select
                    id="country"
                    className="form-control"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">select a country </option>
                    {countries.map(country => (
                      <option key={country.geonameId} value={country.countryName}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '0.75em' }}>
                  <label htmlFor="city"> Approximately at: </label>
                  <select
                    id="city"
                    className="form-control"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">select a city </option>
                    {cities.map(city => (
                      <option key={city.geonameId} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-left" style={{ marginBottom: '0.75em' }}>
                  <button
                    type="button"
                    onClick={(e) => saveOpinion(e)}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "5px",
                      marginRight: "10px" // Add some spacing between buttons
                    }}
                  >
                    {id ? `Update Your Opinion` : `Share your Opinion`}
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
                    Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
      <Footer />
    </>
  );
};

export default AddOpinion;