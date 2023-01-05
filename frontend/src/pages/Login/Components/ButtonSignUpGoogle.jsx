import { Link } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import "./ButtonSignUpGoogle.css";
import handleLogin from "../../../services/loginGoogle";

function ButtonSignUpGoogle() {
  return (
    <button type="button" className="googleBtn" onClick={handleLogin}>
      <Link to="/dashboard">
        With
        <IoLogoGoogle className="googleLogo" />
      </Link>
    </button>
  );
}

export default ButtonSignUpGoogle;
