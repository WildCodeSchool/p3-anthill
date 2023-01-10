import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosAt, IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import ButtonSignUpGoogle from "./ButtonSignUpGoogle";
import useCurrentUser from "../../../services/useCurrentUser";

function SignUpForm() {
  const usernameRef = useRef("");
  const pseudoRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const isLoggedIn = useCurrentUser();

  const URL = import.meta.env.VITE_BACKEND_URL;

  const register = () => {
    axios
      .post(`${URL}/api/users`, {
        email: emailRef.current?.value,
        fullname: usernameRef.current?.value,
        pseudo: pseudoRef.current?.value,
        password: passwordRef.current?.value,
      })
      .catch((err) => {
        console.error(err);
      });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: emailRef.current?.value,
        fullname: usernameRef.current?.value,
        pseudo: pseudoRef.current?.value,
      })
    );
  };

  const handleSubmit = () => {
    if (isLoggedIn) {
      return navigate("/dashboard");
    }
    return null;
  };
  return (
    <form onSubmit={handleSubmit}>
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
          className="form-style"
          placeholder="Your Pseudo"
          autoComplete="off"
          ref={pseudoRef}
        />
      </div>
      <div className="form-group">
        <IoIosAt className="icons" />
        <input
          type="email"
          className="form-style"
          placeholder="Your Email"
          autoComplete="off"
          ref={emailRef}
        />
      </div>
      <div className="form-group">
        <IoMdKey className="icons" />
        <input
          type="password"
          className="form-style"
          placeholder="Your Password"
          autoComplete="off"
          ref={passwordRef}
        />
      </div>
      <div className="buttons">
        <button onClick={register} type="submit" className="btn">
          submit
        </button>
        <ButtonSignUpGoogle />
      </div>
    </form>
  );
}

export default SignUpForm;
