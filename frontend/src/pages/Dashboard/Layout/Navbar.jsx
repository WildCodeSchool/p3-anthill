import { FiSettings } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { useState } from "react";
import { Link } from "react-router-dom";
import PopUpTopic from "../Components/PopUpTopic";
import Logo from "../../../assets/Logo/Logo";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <header className="nav-bar">
      <Logo />
      <div className="nav-right">
        <div>
          <button
            onClick={handleClick}
            type="button"
            className="add-btn"
            title="Add New Project"
          >
            <TiPlus />
          </button>
          {isOpen ? <PopUpTopic closePopUp={() => setIsOpen(false)} /> : null}
        </div>
        <Link to="users/1/settings">
          <button type="button" className="setting-btn" title="User Settings">
            <FiSettings />
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
