import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosAt, IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import useFetchLazy from "../../../services/useFetchLazy";

function SignUpForm() {
  const usernameRef = useRef();
  const pseudoRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { trigger: triggerSignUp, data: user } = useFetchLazy({
    method: "post",
    path: "/users/signup",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSignUp({
      email: emailRef.current?.value,
      fullname: usernameRef.current?.value,
      pseudo: pseudoRef.current?.value,
      password: passwordRef.current?.value,
    });
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          token: user.token,
        })
      );
      navigate("/dashboard");
    }
  }, [user]);

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
          autoComplete="email"
          ref={emailRef}
        />
      </div>
      <div className="form-group">
        <IoMdKey className="icons" />
        <input
          type="password"
          className="form-style"
          placeholder="Your Password"
          autoComplete="new-password"
          ref={passwordRef}
        />
      </div>
      <div className="submit-button-signup">
        <button type="submit" className="btn">
          submit
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
