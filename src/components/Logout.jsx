import '../../src/App.css'
import React, { useContext,useState } from 'react';
import AuthContext from '../components/shared/AuthContext';
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer.js";

const Logout = () => {

  const {LogOut}= useContext(AuthContext);

  return (
  <>
    <div className="container">
          <div className="row justify-content-left">
              <div className="col-sm-8">
                  <h2 className="text-left" style={{fontWeight:"bolder"}}>LEAVE US NOW?</h2>
              </div>
          </div>

          <div className="row justify-content-left">
              <div className="col-sm-8">
                  <div className="text-left">
                    <Button variant="primary" type="button" onClick={LogOut}  style={{
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "5px",
                              outline: "none",
                            }}>
                      Logout
                    </Button>
                  </div>
              </div>
          </div>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br/>
  <Footer/>  
  </>
  );
};

export default Logout;
