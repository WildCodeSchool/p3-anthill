import { IoLogoGoogle } from "react-icons/io";
import "./ButtonSignUpGoogle.css";
import handleLogin from "../../../services/loginGoogle";

function ButtonSignUpGoogle() {
  return (
    <button type="submit" className="googleBtn" onClick={handleLogin}>
      With
      <IoLogoGoogle className="googleLogo" />
    </button>
  );
}

export default ButtonSignUpGoogle;
