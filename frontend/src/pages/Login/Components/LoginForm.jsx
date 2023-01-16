import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import bcrypt from "bcryptjs";
import { IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import ButtonLoginGoogle from "./ButtonLoginGoogle";
import useFetchLazy from "../../../services/useFetchLazy";

function LoginForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isError, setIsError] = useState(false);

  const userRef = useRef("");
  const passwordRef = useRef("");

  const { trigger: triggerGetUser, data: user } = useFetchLazy({
    method: "get",
    path: `/users/email/${userRef.current?.value}`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLogin(true);

    if (isLogin) {
      triggerGetUser();
      setIsLogin(false);
    }
    if (user) {
      const validPass = await bcrypt.compare(
        passwordRef.current?.value,
        user.password
      );
      if (validPass) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            fullname: user.fullname,
          })
        );
        navigate("/dashboard");
      } else {
        setIsError(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && <div className="error-login">Invalid email or password</div>}
      <div className="form-group">
        <GiAnt className="ant-icon" />
        <input
          type="email"
          className="form-style"
          placeholder="Your Email"
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
        <ButtonLoginGoogle />
      </div>
    </form>
  );
}

export default LoginForm;
