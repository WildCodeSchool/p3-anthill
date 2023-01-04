import { IoIosAt, IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
/* import { CgArrowTopLeft } from "react-icons/cg"; */
import ButtonLoginGoogle from "./Components/ButtonLoginGoogle";
import Logo from "../../assets/Logo/Logo";
import "./index.css";

function Login() {
  return (
    <div className="login">
      <Logo />

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
                    <div className="form-group">
                      <IoIosAt className="icons" />
                      <input
                        type="email"
                        name="logemail"
                        className="form-style"
                        placeholder="Your Email"
                        id="logemail"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <IoMdKey className="icons" />
                      <input
                        type="password"
                        name="logpass"
                        className="form-style"
                        placeholder="Your Password"
                        id="logpass"
                        autoComplete="off"
                      />
                    </div>
                    <div className="buttons">
                      <button type="button" className="btn">
                        submit
                      </button>
                      <ButtonLoginGoogle />
                    </div>
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
                    <div className="form-group">
                      <GiAnt className="ant-icon" />
                      <input
                        type="text"
                        name="logname"
                        className="form-style"
                        placeholder="Your Full Name"
                        id="logname"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <IoIosAt className="icons" />
                      <input
                        type="email"
                        name="logemail"
                        className="form-style"
                        placeholder="Your Email"
                        id="logemail"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-group">
                      <IoMdKey className="icons" />
                      <input
                        type="password"
                        name="logpass"
                        className="form-style"
                        placeholder="Your Password"
                        id="logpass"
                        autoComplete="off"
                      />
                    </div>
                    <div className="buttons">
                      <button type="button" className="btn">
                        submit
                      </button>
                      <ButtonLoginGoogle />
                    </div>
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
