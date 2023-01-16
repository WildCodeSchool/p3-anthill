import { IoLogoGoogle } from "react-icons/io";
import "./ButtonGoogle.css";
import handleSignUp from "../../../services/signUpGoogle";

function ButtonSignUpGoogle() {
  return (
    <button type="button" className="googleBtn" onClick={handleSignUp}>
      With
      <IoLogoGoogle className="googleLogo" />
    </button>
  );
}

export default ButtonSignUpGoogle;
