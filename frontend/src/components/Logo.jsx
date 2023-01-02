import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <div className="logoContainer">
      <Link to="/">
        <img
          src="/logo/logoDoré.png"
          alt="logo anthill"
          className="logoLogin"
        />
      </Link>
    </div>
  );
}

export default Logo;
