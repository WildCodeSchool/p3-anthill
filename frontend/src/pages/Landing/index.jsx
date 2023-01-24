import { Link } from "react-router-dom";
import scrollController from "./Components/scrollController";

import NavLanding from "./Components/NavLanding";
import Footer from "./Components/footer/Footer";

import "./index.css";

function Landing() {
  const { isSticky, element } = scrollController();
  return (
    <div className="landing">
      <NavLanding sticky={isSticky} />
      <div ref={element} className="main">
        <section className="slider" id="section1">
          <h1>INTRO</h1>
          <h2>About our website</h2>
        </section>
        <section className="slider" id="section2">
          <h1>DASHBOARD</h1>
          <h2>introduce the operations</h2>
        </section>
        <section className="slider" id="section3">
          <h1>FEATURE</h1>
          <h2>framework for Production</h2>
        </section>
        <section className="slider" id="section4">
          <h1>CUSTOMER</h1>
          <h2>giving you better viewer for the future</h2>
        </section>
        <section className="slider-us" id="section5">
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
