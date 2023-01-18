import { Link } from "react-router-dom";
import NavLanding from "./Components/NavLanding";
import Footer from "./Components/footer/Footer";

import "./index.css";

function Landing() {
  return (
    <div className="landing">
      <NavLanding />
      <div className="main">
        <section className="slider" id="tab-intro">
          <h1>INTRO</h1>
          <h2>another frontend JS framework</h2>
        </section>
        <section className="slider" id="tab-dash">
          <h1>DASHBOARD</h1>
          <h2>an extremely fast JavaScript bundler</h2>
        </section>
        <section className="slider" id="tab-next">
          <h1>NEXT.JS</h1>
          <h2>framework for Production</h2>
        </section>
        <section className="slider" id="tab-typescript">
          <h1>TYPESCRIPT</h1>
          <h2>giving you better tooling at any scale</h2>
        </section>
        <section className="slider-us" id="tab-aboutUs">
          <Footer />
        </section>
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
