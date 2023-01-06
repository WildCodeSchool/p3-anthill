import { useRef } from "react";
import axios from "axios";
import { IoIosAt, IoMdKey } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { GiAnt } from "react-icons/gi";
/* import { CgArrowTopLeft } from "react-icons/cg"; */
import ButtonSignUpGoogle from "./Components/ButtonSignUpGoogle";
import Logo from "../../assets/Logo/Logo";
import "./index.css";

function Login() {
  const usernameRef = useRef("");
  const pseudoRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  // const navigate = useNavigate();

  const URL = import.meta.env.VITE_BACKEND_URL;

  const register = () => {
    axios
      .post(`${URL}/api/users`, {
        email: emailRef.current?.value,
        fullname: usernameRef.current?.value,
        pseudo: pseudoRef.current?.value,
        password: passwordRef.current?.value,
      })
      .then((res) => {
        emailRef(res);
        usernameRef(res);
        pseudoRef(res);
        passwordRef(res);
      });
  };

  // const handleSubmit = () => {
  //   navigate("/contacts");
  // };

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
                      <GiAnt className="ant-icon" />
                      <input
                        type="text"
                        name="logpseudp"
                        className="form-style"
                        placeholder="Your Pseudo"
                        id="logpseudo"
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
                    <form>
                      <div className="form-group">
                        <BsFillPersonFill className="icons" />
                        <input
                          type="text"
                          name="logname"
                          className="form-style"
                          placeholder="Your Full Name"
                          id="logname"
                          autoComplete="off"
                          ref={usernameRef}
                        />
                      </div>
                      <div className="form-group">
                        <GiAnt className="ant-icon" />
                        <input
                          type="text"
                          name="logpseud0"
                          className="form-style"
                          placeholder="Your Pseudo"
                          id="logpseudo"
                          autoComplete="off"
                          ref={pseudoRef}
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
                          ref={emailRef}
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
                          ref={passwordRef}
                        />
                      </div>
                      <div className="buttons">
                        <button
                          onClick={register}
                          type="submit"
                          className="btn"
                        >
                          submit
                        </button>
                        <ButtonSignUpGoogle />
                      </div>
                    </form>
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
