import { IoIosAt, IoMdKey } from "react-icons/io";
import { GiAnt } from "react-icons/gi";
import ButtonSignUpGoogle from "./ButtonSignUpGoogle";

function LoginForm() {
  return (
    <form>
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
        <ButtonSignUpGoogle />
      </div>
    </form>
  );
}

export default LoginForm;
