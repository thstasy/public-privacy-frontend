import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer.js";
import httpClient from "../http-common.js";
import Alert from "./Alert.js"; 

function Register() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("notification");

  function reloadForm() {
    setUsername('');
    setEmail('');
    setPassword('');
  }

  async function register(event) {
    event.preventDefault();

    try {
      const apiResponse = await httpClient.post(
        "/collaborator/register",
        {
          username: username,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (apiResponse.status !== 201) {
        setAlertMessage("Sorry. Either the name or email is already taken. Please use another one.");
        setAlertType("notification");
      } else {
        setAlertMessage(`Now you are a Collaborator, ${username}!\nAn email has been sent to the provided address. Please confirm the link in 10 minutes.`);
        setAlertType("notification");
        setTimeout(() => {
          navigate('/collaborator/login');
        }, 500); // 0.5 second delay
      }
    } catch (err) {
      setErrorMessage(err?.response?.data);

      if (err.response) {
        if (err.response.data === "An email address can only be registered for an account.") {
          setAlertMessage("An email address can only be registered for an account.");
        } else if (err.response.data === "Username already exists") {
          setAlertMessage("Username already exists");
        } else if (err.response.data === "The fields are required to be filled.") {
          setAlertMessage("The fields are required to be filled.");
        } else {
          setAlertMessage("An error occurred. Please try again.");
        }
      } else {
        setAlertMessage("An error occurred. Please try again.");
      }
      setAlertType("notification");
      reloadForm();
    }
    setShowAlert(true);
  }

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
          <div className="col-sm-8 text-left">
            <h2 className="text-left" style={{ fontWeight: "bolder" }}>Join As Collaborator!</h2>
          </div>
        </div>

        <div className="row justify-content-left">
          <div className="col-sm-8">
            <form onSubmit={register}>
              <div className="form-group">
                <label htmlFor="collaborator_name">How should we call you?</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Name"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email <small className="reminder-text">(Please provide a valid email address for activating the account)</small></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} />
              </div>

              <br />

              <div className="text-left">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "5px",
                  }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  )
}

export default Register;
