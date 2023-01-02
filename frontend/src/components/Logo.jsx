import { Link } from "react-router-dom";

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
