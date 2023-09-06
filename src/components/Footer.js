import '../../src/App.css';
import signature from './signature.png';

const Footer = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer style={{ textAlign: "right", color: "black" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-end">
              <p style={{ color: "black", fontWeight: "normal", marginBottom: "4px" }}>
                <em>"Bare honest witness to my experience."
                </em>
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-end">
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <p style={{ fontSize: "12px", fontStyle: "italic", fontWeight: "normal", color: "rgb(128,128,128)", marginBottom: 0 }}>
                  Last Updated: {currentDate}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <img src={signature} alt="signature" style={{ maxWidth: "120px", padding: "0", marginBottom: "1px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
