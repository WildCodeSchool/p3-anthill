import { FiSettings } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
// import { IoMdNotificationsOutline } from "react-icons/io";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav-bar">
      <div className="nav-right">
        <button type="button" className="add-btn" title="Add New Project">
          <TiPlus />
        </button>
        {/* Notification button */}
        {/* <div className="notification">
          <span className="notification-number">3</span>
          <IoMdNotificationsOutline />
        </div> */}
        {/* <button type="button" className="profile-btn">
          <img src={photo} alt="" />
          <span>{name}</span>
        </button> */}
        <button type="button" className="setting-btn" title="User Settings">
          <FiSettings />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
