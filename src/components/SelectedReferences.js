import Footer from "./Footer.js";

const SelectedEssays = () => {
  return (
    <>
    <div className="container">
      <div className="row justify-content-left">
        <div className="col-sm-8 text-left">
          <h2 id="selected-references" style={{fontWeight:"bolder"}}>SELECTED REFERENCES</h2>
          <h6>
            We want to protect oursevles when articulating as honestly as possible on the Internet. These practical law guides are the way out.
          </h6>
          <br/>
          <h4 style={{fontWeight:"bolder"}}>Books and Essays</h4>
        </div>

        <div className="col-sm-8 text-left" style={{ margin: "0.5em 0 1em 0" }}>
          <h6>Dive into the practical details of content moderation</h6>
          <h6 style={{color:"gray"}}>
            - Tarleton Gillepsie, <cite style={{color:"gray"}}>Custodians of the Internet</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-left" style={{ margin: "0.5em 0 0.5em 0" }}>
          <h6>A Judicial History of Internet Free Speech Management and Regulation</h6>
          <h6 style={{color:"gray"}}>
            - Kate Klonick, <cite style={{color:"gray"}}>The New Governors in Harvard Review</cite>
          </h6>
          <h6 style={{color:"gray"}}>
            - Nic Suzor, <cite style={{color:"gray"}}>Lawless</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-left" style={{ margin: "0.5em 0 0.5em 0" }}>
          <h6>A Manifesto for the Way of Social Media Management</h6>
          <h6 style={{color:"gray"}}>
            - Rebecca MacKinnon, <cite style={{color:"gray"}}>Consent of the Networked</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-left" style={{ margin: "0.5em 0 0.5em 0" }}>
          <h6>How social media is eroding democracy</h6>
          <h6 style={{color:"gray"}}> 
            - Sarah T. Roberts, <cite style={{color:"gray"}}>Anti-social Media</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-left" style={{ margin: "0.5em 0 1em 0" }}>
          <h6 >Exploring the Impact of Content Moderation on Workers</h6>
          <h6 style={{color:"gray"}}>
            - Siva Vaidyanathan, <cite style={{color:"gray"}}>Behind the Screen</cite>
          </h6>
        </div>
      </div>

    <div className="row justify-content-text-left">
        <div className="col-sm-8 text-left">
          <br/>
          <h4 style={{fontWeight:"bolder"}}>Laws</h4>
          <h6 style={{color:"gray"}}>Volksverhetzung, Germany</h6>
          <h6 style={{color:"gray"}}>NetzDG(Network Enforcement Act), Germany</h6>
        </div>
    </div>
    <br/>
    <br/>
    <br /><br /><br /><br /><br /><br /><br /><br/>
    <Footer />
    </div>
    </>
  );
};

export default SelectedEssays;
