import { Link } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import handleLogin from "../../../services/loginGoogle";

function ButtonLoginGoogle() {
  return (
    <button type="button" className="googleBtn" onClick={handleLogin}>
      <Link to="/dashboard">
        With
        <IoLogoGoogle className="googleLogo" />
      </Link>
    </button>
  );
}

export default ButtonLoginGoogle;
