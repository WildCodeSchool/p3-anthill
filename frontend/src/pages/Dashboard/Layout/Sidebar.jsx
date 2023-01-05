import { Link } from "react-router-dom";

import { useRef } from "react";
import { MdAllInclusive } from "react-icons/md";
import { TbCrown } from "react-icons/tb";
import { GiAnt } from "react-icons/gi";
import { RiContactsLine } from "react-icons/ri";

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
    <aside className="side-bar">
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
            <Link to="/dashboard?">
              <button type="button" onClick={handleIsActive}>
                <TbCrown className="icon" />
                <span className="sidebar-listItemText">My Topics</span>
              </button>
            </Link>
          </li>
          <li ref={ref2} className="sidebar-listItem">
            <Link to="topics">
              <button type="button" onClick={handleIsActive}>
                <MdAllInclusive className="icon" />
                <span className="sidebar-listItemText">All Topics</span>
              </button>
            </Link>
          </li>
          <li ref={ref3} className="sidebar-listItem">
            <Link to="/dashboard?">
              <button type="button" onClick={handleIsActive}>
                <GiAnt className="icon" />
                <span className="sidebar-listItemText">Co. Topics</span>
              </button>
            </Link>
          </li>
          <li ref={ref4} className="sidebar-listItem">
            <Link to="users">
              <button type="button" onClick={handleIsActive}>
                <RiContactsLine className="icon" />
                <span className="sidebar-listItemText">Contacts</span>
              </button>
            </Link>
          </li>
        </ul>

        <button type="button" className="signOut-btn">
          <Link to="/login" className="signOut-btn">
            Log Out
          </Link>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
