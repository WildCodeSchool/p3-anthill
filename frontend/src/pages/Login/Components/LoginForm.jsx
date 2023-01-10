import { useNavigate } from "react-router-dom";
import { IoIosAt, IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import ButtonSignUpGoogle from "./ButtonSignUpGoogle";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <GiAnt className="ant-icon" />
        <input
          type="text"
          className="form-style"
          placeholder="Your Pseudo"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <IoIosAt className="icons" />
        <input
          type="email"
          className="form-style"
          placeholder="Your Email"
          autoComplete="off"
        />
      </div>
      <div className="form-group">
        <IoMdKey className="icons" />
        <input
          type="password"
          className="form-style"
          placeholder="Your Password"
          autoComplete="off"
        />
      </div>
      <div className="buttons">
        <button type="button" className="btn">
          submit
        </button>
        <ButtonSignUpGoogle />
      </div>
    </form>
  );
}

export default LoginForm;
