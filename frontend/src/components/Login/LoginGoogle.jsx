import { FcGoogle } from "react-icons/fc";
import handleLogin from "../../services/loginGoogle";

function LoginGoogle() {
  return (
    <button type="button" onClick={handleLogin}>
      <FcGoogle /> Login
    </button>
  );
}

export default LoginGoogle;
