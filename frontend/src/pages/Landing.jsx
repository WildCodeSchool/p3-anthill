import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div id="landing">
      <div>
        <img
          className="logoLanding"
          src="../../public/logo/logoDoré.png"
          alt="logo anthill"
        />
      </div>
      <div>
        <button type="button" className="buttonLanding">
          <Link to="/login">Log in / Sign in</Link>
        </button>
      </div>
    </div>
  );
}

export default Landing;
