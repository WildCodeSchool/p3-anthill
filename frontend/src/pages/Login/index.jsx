import BackgrdParticles from "../../assets/BackgrdParticles/BackgrdParticles";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import Logo from "../../assets/Logo/Logo";
import "./index.css";

function Login() {
  return (
    <div className="login">
      <BackgrdParticles />
      <div className="logoLogin">
        <Logo />
      </div>
      <div className="container">
        <div className="container2">
          <div className="container-checkbox">
            <span>Log In </span>
            <span>Sign Up</span>
          </div>
          <input
            className="checkbox"
            type="checkbox"
            id="reg-log"
            name="reg-log"
          />
          <label htmlFor="reg-log"> </label>
          <div className="card-3d-wrap">
            <div className="card-3d-wrapper">
              <div className="card-front">
                <div className="center-wrap">
                  <div className="all-container">
                    <h4 className="title-container">Log In</h4>
                    <LoginForm />

                    <p className="forgot-text">
                      <a href="#0" className="link">
                        Forgot your password?
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <div className="center-wrap">
                  <div className="all-container">
                    <h4 className="title-container">Sign Up</h4>
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
