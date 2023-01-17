import { Link } from "react-router-dom";
import Footer from "./Components/footer/Footer";

import "./index.css";

function Landing() {
  return (
    <div className="landing">
      <div>
        <img
          className="logoLanding"
          src="/png/logoDoré.png"
          alt="logo anthill"
        />
      </div>
      <div>
        <button type="button" className="buttonLanding">
          <Link to="/login">Log in / Sign in</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
