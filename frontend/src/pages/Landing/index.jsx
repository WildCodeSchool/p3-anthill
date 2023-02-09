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
                always connected with the rest of your company,
                <br /> find new ideas, comment, vote.
                <br /> <br />
                We promote exchange, creation and innovation.
              </p>
            </div>
          </div>
        </section>
        <section className="slider" id="section2">
          <h1>DASHBOARD</h1>
          <h2>An overview</h2>
          <div className="sous-section2">
            <div className="sous-section2-text-image">
              <img
                src="/png/allTopics.png"
                alt="screen shot of the site"
                className="screen-shot"
              />
              <p>
                Anthill's goal is to improve communication within a company with
                a simple and clear interface.
                <br />
                You can find all the exchanges within your team, and of course
                each one of your team mates.
              </p>
            </div>
          </div>
        </section>
        <section className="slider" id="section3">
          <h1>FEATURE</h1>
          <h2>What it does</h2>
          <div className="sous-section3">
            <div className="sous-section3-text-image">
              <div className="sous-section-text">
                <p>
                  You can create topics in order to start a debate or make a
                  decision about anything, each user has the opportunity to
                  collaborate by sharing one or more ideas.
                </p>
                <p>
                  Leave a comment on each idea to influence the result and don't
                  forget to vote for the best one, watch out for the deadline !
                </p>
              </div>
              <img
                src="/png/createTopic.png"
                alt="screen shot of the site"
                className="screen-shot"
              />
            </div>
          </div>
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
