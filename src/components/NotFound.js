import { useLocation } from "react-router";
import Footer from "../components/Footer.js";

const NotFound  = () => {
    let location=useLocation();
    console.log(location);
    return (
        <>
        <div className="container">
        <div className="row justify-content-left">
            <div className="col-sm-8 text-left">
                <h2 style={{fontWeight:"bolder"}}>Resource not found at {location.pathname}</h2>
                <h6>You may need to login first to access. Or the opinion might have been deleted.</h6>
            </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br/>
        <Footer/>
        </div>
        </>
    );
}
 
export default NotFound ;