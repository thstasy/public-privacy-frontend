import React from "react";
import Footer from "../components/Footer.js";

const About = () => {
  return (
    <>
      <div className="container" >
        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left">
              <h2 style={{ margin: "0em", fontWeight: "bolder" }}>ABOUT</h2>
              <h6 style= {{ margin: "0.5em 0em 1.5em 0em"}}>
                As a female physicist and engineer who was born and educated in Taiwan, and have pursued my studies and career across more
                than 7 countries, I am acutely aware of the persistent gender inequality in the STEM domain—a global issue. Despite the
                strides we have made, a comprehensive support system remains elusive, encompassing legal consultation, advanced career
                guidance, and psychological well-being.
                <br/><br/>
                <span style={{ fontWeight: "bolder",fontSize:"bigger" }}>public+privacy</span> stands as a testament. It signifies an inclusive
                platform, fostering open dialogue where every voice finds equal prominence. It is my aspiration that the upcoming generations
                in STEM will encounter a landscape replete with authentic gender equality.
              </h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left">
              <h5 style={{ margin: "0em", fontWeight: "bolder" }}>Mission Statement</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>
                What is public, what is private? We started sharing our private experiences on healthcare, gender equality,
                and the educational system publicly so that individuals who have the same experiences will know that they
                are not alone. <span style={{ fontWeight: "bolder", fontSize:"bigger" }}>public+privacy</span> bears this mission in mind to serve as a channel for building a safe communication and experiences-sharing hub. 
              </h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left">
              <h5 style={{ margin: "0em", fontWeight: "bolder" }}>Collaboration</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>Join as Collaborators and share your experiences!</h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left">
              <h5 style={{ margin: "0em", fontWeight: "bolder" }}>Contact</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>t.hsuanhsieh@gmail.com</h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-left">
              <h5 style={{ margin: "0em", fontWeight: "bolder" }}>Selected References</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>
                Relevant Research References from NGO, and my essays will be updated here bi-weekly.
              </h6>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

            