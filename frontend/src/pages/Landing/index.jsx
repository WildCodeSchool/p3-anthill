import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../services/useCurrentUser";
import "./index.css";

function Landing() {
  const navigate = useNavigate();
  const isLoggedIn = useCurrentUser();

  const handleConnexion = () => {
    if (isLoggedIn) {
      return navigate("/dashboard");
    }
    return navigate("/login");
  };
  return (
    <div id="landing">
      <div>
        <img
          className="logoLanding"
          src="/png/logoDoré.png"
          alt="logo anthill"
        />
      </div>
      <div>
        <button
          onClick={handleConnexion}
          type="button"
          className="buttonLanding"
        >
          Go to the site
        </button>
      </div>
    </div>
  );
}

export default Landing;
