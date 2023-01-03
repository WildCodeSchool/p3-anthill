import { IoLogoGoogle } from "react-icons/io";
import handleLogin from "../../services/loginGoogle";
import "./ButtonLoginGoogle.css";

function ButtonLoginGoogle() {
  return (
    <button type="button" className="googleBtn" onClick={handleLogin}>
      With
      <IoLogoGoogle className="googleLogo" />
    </button>
  );
}

export default ButtonLoginGoogle;
