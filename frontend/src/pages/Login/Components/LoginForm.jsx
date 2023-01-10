import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import bcrypt from "bcryptjs";
import { IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import ButtonSignUpGoogle from "./ButtonSignUpGoogle";
import useFetchLazy from "../../../services/useFetchLazy";

function LoginForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const userRef = useRef("");
  const passwordRef = useRef("");

  const { trigger: triggerGetUser, data: user } = useFetchLazy({
    method: "get",
    path: `/users/pseudo/${userRef.current?.value}`,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogin(true);
  };

  useEffect(() => {
    if (isLogin) {
      triggerGetUser();
      setIsLogin(false);
    }
    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
          fullname: user.fullname,
          password: user.password,
        })
      );
      navigate("/dashboard");
    }
  }, [user, isLogin]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <GiAnt className="ant-icon" />
        <input
          type="text"
          className="form-style"
          placeholder="Your Pseudo"
          autoComplete="off"
          ref={userRef}
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
        <button type="submit" className="btn">
          submit
        </button>
        <ButtonSignUpGoogle />
      </div>
    </form>
  );
}

export default LoginForm;
