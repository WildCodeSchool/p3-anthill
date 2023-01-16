import { IoLogoGoogle } from "react-icons/io";
import "./ButtonGoogle.css";
import handleLogin from "../../../services/loginGoogle";

function ButtonLoginGoogle() {
  return (
    <button type="submit" className="googleBtn" onClick={handleLogin}>
      With
      <IoLogoGoogle className="googleLogo" />
    </button>
  );
}

export default ButtonLoginGoogle;
