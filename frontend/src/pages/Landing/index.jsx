import { Link } from "react-router-dom";
import Section01 from "./Components/Section01";
import "./index.css";

function Landing() {
  return (
    <div className="landing">
      <Section01 />
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
    </div>
  );
}

export default Landing;
