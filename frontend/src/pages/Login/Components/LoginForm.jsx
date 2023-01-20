import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import ButtonLoginGoogle from "./ButtonLoginGoogle";
import useFetchLazy from "../../../services/useFetchLazy";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {
    trigger: triggerLogin,
    data: user,
    error,
  } = useFetchLazy({
    method: "post",
    path: `/users/login`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    triggerLogin({ email, password });
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
      {error?.response.status === 400 && (
        <div className="error-login">Invalid email</div>
      )}
      {error?.response.status === 401 && (
        <div className="error-login">Invalid password</div>
      )}
      <div className="form-group">
        <GiAnt className="ant-icon" />
        <input
          type="email"
          className="form-style"
          placeholder="Your Email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <IoMdKey className="icons" />
        <input
          type="password"
          className="form-style"
          placeholder="Your Password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
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
