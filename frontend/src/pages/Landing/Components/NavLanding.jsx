import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../public/png/logoDoré.png";
import BackgrdParticles from "../../../assets/BackgrdParticles/BackgrdParticles";
import "./NavLanding.css";

const {
  gsap: { set, to },
} = window;

function NavLanding({ sticky }) {
  const textRef = useRef(null);
  const stageRef = useRef(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  useEffect(() => {
    set(stageRef.current, { autoAlpha: 1 });

    set(textRef.current, {
      transformOrigin: "center bottom",
      y: -500,
    });

    to(textRef.current, {
      y: 40,
      scaleY: 1,
      ease: "elastic(0.3, 0.1)",
      duration: 1,
      delay: 0.5,
      stagger: {
        each: 0.05,
        from: "random",
      },
    });
  }, []);

  return (
    <div className="nav-landing">
      <div className="container-btn-login">
        <button type="button" onClick={handleNavigate} className="btn-login">
          Log in
        </button>
      </div>
      <BackgrdParticles />
      <div className="stage">
        <div className="content" ref={stageRef}>
          <img src={logo} alt="" ref={textRef} className="txt" />
        </div>
        <div>
          <h3 className="span loader">
            <span className="m">Make</span>
            <span className="m">Ideas</span>
            <span className="m">Brilli-ant</span>
          </h3>
        </div>
      </div>
      <nav className={sticky ? "nav-container top-first" : "nav-container"}>
        <a className="nav-tab" href="#section1">
          INTRO
        </a>
        <a className="nav-tab" href="#section2">
          DASHBOARD
        </a>
        <a className="nav-tab" href="#section3">
          FEATURES
        </a>
        <a className="nav-tab" href="#section4">
          CUSTOMER
        </a>
        <a className="nav-tab" href="#section5">
          About Us
        </a>
        <span className="nav-tab-slider" />
      </nav>
    </div>
  );
}

export default NavLanding;
