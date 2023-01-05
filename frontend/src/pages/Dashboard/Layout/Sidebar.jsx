import { useRef } from "react";
import { MdAllInclusive } from "react-icons/md";
import { TbCrown } from "react-icons/tb";
import { GiAnt } from "react-icons/gi";
import { RiContactsLine } from "react-icons/ri";

import Logo from "../../../assets/Logo/Logo";

import "./Sidebar.css";

function Sidebar({ name, photo }) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const handleIsActive = (e) => {
    const check = e.target.innerText;
    if (check === "My Topics") {
      ref1.current.className = "sidebar-listItem active";
    } else {
      ref1.current.className = "sidebar-listItem";
    }
    if (check === "All Topics") {
      ref2.current.className = "sidebar-listItem active";
    } else {
      ref2.current.className = "sidebar-listItem";
    }
    if (check === "Co. Topics") {
      ref3.current.className = "sidebar-listItem active";
    } else {
      ref3.current.className = "sidebar-listItem";
    }
    if (check === "Contacts") {
      ref4.current.className = "sidebar-listItem active";
    } else {
      ref4.current.className = "sidebar-listItem";
    }
  };

  return (
    <div className="side-bar">
      <div className="nav-logo">
        <Logo />
      </div>
      <div className="user-profile-area">
        <div className="topic-manager">Welcome back</div>
        <div className="side-wrapper">
          <div className="user-profile">
            <div className="user-name">{name}</div>
            <img src={photo} alt="" className="user-photo" />
            <div className="user-mood">Mood</div>
          </div>
        </div>
        <ul className="sidebar-list">
          <li ref={ref1} className="sidebar-listItem">
            <button type="button" onClick={handleIsActive}>
              <TbCrown className="icon" />
              <span className="sidebar-listItemText">My Topics</span>
            </button>
          </li>
          <li ref={ref2} className="sidebar-listItem">
            <button type="button" onClick={handleIsActive}>
              <MdAllInclusive className="icon" />
              <span className="sidebar-listItemText">All Topics</span>
            </button>
          </li>
          <li ref={ref3} className="sidebar-listItem">
            <button type="button" onClick={handleIsActive}>
              <GiAnt className="icon" />
              <span className="sidebar-listItemText">Co. Topics</span>
            </button>
          </li>
          <li ref={ref4} className="sidebar-listItem">
            <button type="button" onClick={handleIsActive}>
              <RiContactsLine className="icon" />
              <span className="sidebar-listItemText">Contacts</span>
            </button>
          </li>
        </ul>
        <button type="button" className="signOut-btn">
          Disconnection
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
