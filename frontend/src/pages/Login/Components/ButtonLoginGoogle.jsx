import { useNavigate } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import "./ButtonGoogle.css";
import handleLogin from "../../../services/loginGoogle";

function ButtonLoginGoogle() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="googleBtn"
      onClick={() => {
        handleLogin(() => navigate("/dashboard"));
      }}
    >
      With
      <IoLogoGoogle className="googleLogo" />
    </button>
  );
}

export default ButtonLoginGoogle;
