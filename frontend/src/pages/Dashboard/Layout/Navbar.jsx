import { FiSettings } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import Logo from "../../../assets/Logo/Logo";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="nav-bar">
      <Logo />
      <div className="nav-right">
        <button type="button" className="add-btn" title="Add New Project">
          <TiPlus />
        </button>
        <button type="button" className="setting-btn" title="User Settings">
          <FiSettings />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
