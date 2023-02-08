import { useNavigate } from "react-router-dom";
import scrollController from "./Components/scrollController";
import NavLanding from "./Components/NavLanding";
import Footer from "./Components/footer/Footer";
import "./index.css";

function Landing() {
  const navigate = useNavigate();

  const { isSticky, element } = scrollController();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="landing">
      <NavLanding sticky={isSticky} />
      <div ref={element} className="main">
        <section className="slider" id="section1">
          <h1>INTRO</h1>
          <h2>About our website</h2>
          <div className="sous-section1">
            <div className="sous-section1-text-image">
              <img
                src="/png/mockup.png"
                alt="mockup of the site"
                className="mockup"
              />
              <p>
                A simple way to make decisions with your team. <br /> Stay
                always connected with the rest of your company.
                <br /> Find new ideas, comment, vote.
              </p>
            </div>
          </div>
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
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            className="btn-login"
            onClick={handleNavigate}
            style={{ marginBottom: "100px" }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
