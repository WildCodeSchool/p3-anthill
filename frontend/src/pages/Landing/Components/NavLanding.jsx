import BackgrdParticles from "../../../assets/BackgrdParticles/BackgrdParticles";
import Logo from "../../../assets/Logo/Logo";
import "./NavLanding.css";

function NavLanding() {
  return (
    <div className="nav-landing">
      <BackgrdParticles />
      <h1>Ant Hill</h1>
      <h3 className="span loader">
        <span className="m">B</span>
        <span className="m">E</span>
        <span className="m">N</span>
        <span className="m">E</span>
        <span className="m">F</span>
        <span className="m">I</span>
        <span className="m">T</span>
        <span className="m">S</span>
        <span className="m">&nbsp;</span>
        <span className="m">o</span>
        <span className="m">f</span>
        <span className="m">&nbsp;</span>
        <span className="m">T</span>
        <span className="m">E</span>
        <span className="m">C</span>
        <span className="m">H</span>
        <span className="m">N</span>
        <span className="m">O</span>
        <span className="m">L</span>
        <span className="m">O</span>
        <span className="m">G</span>
        <span className="m">I</span>
        <span className="m">E</span>
        <span className="m">S</span>
      </h3>
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
