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
          <h2>About our website</h2>
        </section>
        <section className="slider" id="tab-dash">
          <h1>DASHBOARD</h1>
          <h2>introduce the operations</h2>
        </section>
        <section className="slider" id="tab-next">
          <h1>FEATURE</h1>
          <h2>framework for Production</h2>
        </section>
        <section className="slider" id="tab-typescript">
          <h1>CUSTOMER</h1>
          <h2>giving you better viewer for the future</h2>
        </section>
        <section className="slider-us" id="tab-aboutUs">
          <Footer />
        </section>
      </div>
      <div>
        <button type="button" className="buttonLanding">
          Go to the site
        </button>
      </div>
    </div>
  );
}

export default Landing;
