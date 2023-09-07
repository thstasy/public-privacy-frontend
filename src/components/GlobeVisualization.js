import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import '../../src/App.css';
import Alert from "./Alert.js";
import Footer from "../components/Footer.js";
import httpClient from "../http-common.js";

function GlobeVisualization() {
  const globeRef = useRef(null);
  const ARC_REL_LEN = 0.4;
  const FLIGHT_TIME = 1000;
  const NUM_RINGS = 3;
  const RINGS_MAX_R = 5;
  const RING_PROPAGATION_SPEED = 5;
  const [email, setEmail] = useState('');

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const subscribe = async (event) => {
    event.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      email: email,
    };

    try {
      const response = await httpClient.post('/subscribe', data, {
        headers,
        withCredentials: true,
      });
      if (response.status === 201) {
        handleShowAlert("An email will be sent to your mailbox for confirmation.", "notification");
        alert("An email will be sent to your mailbox for confirmation.");
      } else if (response.status === 409) {
        const responseData = await response.json();
        if (responseData.message === "Invalid Email" || responseData.message === "Email Already Subscribed") {
          handleShowAlert("Invalid Email: Please provide a valid email address.", "notification");
          alert("Invalid Email: Please provide a valid email address.");
        } else {
          handleShowAlert("Subscription failed.", "notification");
          alert("Subscription failed.");
        }
      } else if (response.status === 500) {
        handleShowAlert("Apologies for internal server error, we'll fix it asap.", "notification");
        alert("Internal Server error. ");
      }
    } catch (error) {
      handleShowAlert("Apologies for internal server error, we'll fix it asap.", "notification");
      alert("An error occurred.");
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .arcColor(() => 'darkOrange')
      .onGlobeClick(emitArc)
      .arcDashLength(ARC_REL_LEN)
      .arcDashGap(2)
      .arcDashInitialGap(1)
      .arcDashAnimateTime(FLIGHT_TIME)
      .arcsTransitionDuration(0)
      .ringColor(() => (t) => `rgba(255,100,50,${1 - t})`)
      .ringMaxRadius(RINGS_MAX_R)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS)
      (globeRef.current);

    let prevCoords = { lat: 0, lng: 0 };

    function emitArc({ lat: endLat, lng: endLng }) {
      const { lat: startLat, lng: startLng } = prevCoords;
      setTimeout(() => {
        prevCoords = { lat: endLat, lng: endLng };
      }, FLIGHT_TIME);

      const arc = { startLat, startLng, endLat, endLng };
      globe.arcsData([...globe.arcsData(), arc]);
      setTimeout(() => globe.arcsData(globe.arcsData().filter((d) => d !== arc)), FLIGHT_TIME * 2);

      const srcRing = { lat: startLat, lng: startLng };
      globe.ringsData([...globe.ringsData(), srcRing]);
      setTimeout(() => globe.ringsData(globe.ringsData().filter((r) => r !== srcRing)), FLIGHT_TIME * ARC_REL_LEN);

      setTimeout(() => {
        const targetRing = { lat: endLat, lng: endLng };
        globe.ringsData([...globe.ringsData(), targetRing]);
        setTimeout(() => globe.ringsData(globe.ringsData().filter((r) => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
      }, FLIGHT_TIME);
    }
  }, []);

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
        <div className="row">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left text-container">
              <h2 style={{ margin: '0em 0em 0.2em 0em', fontWeight: 'bolder', wordBreak: 'break-word' }}>
                TO SUBSCRIBE, ENTER YOUR EMAIL
              </h2>
              <h5>
                What You'll Get From the Subscription: A Story Of My Week
              </h5>
              <h6 style={{ fontWeight: "normal" }}>
                articles related to the topics on Medium and books, ideas from conversations, with a real human being's perspective.
              </h6>
              <div>
                <div className="form-group">
                  <form onSubmit={subscribe}>
                    <label htmlFor="email">Email <small className="reminder-text">(Please provide a valid email address for confirmation)</small></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '5px',
                        marginTop: '0.5em',
                        marginBottom: "0.5em"
                      }}
                    >
                      Submit
                    </button>

                  </form>
                </div>
              </div>
              <div className="globe-container">
                <p className="overlay-text">Click on the globe to see how signals transmit!</p>
                <div ref={globeRef} style={{ cursor: 'pointer', width: '100%', height: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  );
}

export default GlobeVisualization;

