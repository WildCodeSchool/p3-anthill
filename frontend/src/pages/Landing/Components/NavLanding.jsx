import { useEffect, useRef } from "react";

import BackgrdParticles from "../../../assets/BackgrdParticles/BackgrdParticles";
import Logo from "../../../assets/Logo/Logo";
import "./NavLanding.css";

const {
  gsap: { set, to },
} = window;

function NavLanding() {
  const textRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    set(stageRef.current, { autoAlpha: 1 });

    set(textRef.current, {
      transformOrigin: "center bottom",
      y: -500,
    });

    to(textRef.current, {
      y: 80,
      fontWeight: 600,
      fontStretch: 40,
      scaleY: 1,
      ease: "elastic(0.3, 0.1)",
      duration: 1.5,
      delay: 0.5,
      stagger: {
        each: 0.05,
        from: "random",
      },
    });
  }, []);

  return (
    <div className="nav-landing">
      <BackgrdParticles />
      <div className="stage">
        <div className="content" ref={stageRef}>
          <h1 className="txt" ref={textRef}>
            AntHill
          </h1>
        </div>
        <div>
          <h3 className="span loader">
            <span className="m">Make</span>
            <span className="m">Ideas</span>
            <span className="m">Brilli</span>
            <span className="m">-</span>
            <span className="m">Ant</span>
          </h3>
        </div>
      </div>
      <div className="nav-container">
        <Logo />
        <a className="nav-tab" href="#tab-intro">
          INTRO
        </a>
        <a className="nav-tab" href="#tab-dash">
          DASHBOARD
        </a>
        <a className="nav-tab" href="#tab-typescript">
          TYPESCRIPT
        </a>
        <a className="nav-tab" href="#tab-aboutUs">
          About Us
        </a>
        <span className="nav-tab-slider" />
      </div>
    </div>
  );
}

export default NavLanding;
