import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../services/useCurrentUser";
import Section01 from "./Components/Section01";
import Footer from "./Components/footer/Footer";
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
    <div className="landing">
      <Section01 />
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
      <Footer />
    </div>
  );
}

export default Landing;
