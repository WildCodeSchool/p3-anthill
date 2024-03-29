import { useState } from "react";

import { Link } from "react-router-dom";

import { MdAllInclusive } from "react-icons/md";
import { TbCrown } from "react-icons/tb";
import { BsPencil } from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

import SideBarListItems from "../Components/SideBarListItems/SideBarListItems";

import "./Sidebar.css";

function Sidebar({ userId, name, photo, pseudo }) {
  const [activeButton, setActiveButton] = useState(null);
  const sideBarList = [
    {
      id: 1,
      text: "Top Topics",
      icon: <TbCrown className="icon" />,
      active: activeButton === 1,
      path: `/dashboard`,
    },
    {
      id: 2,
      text: "All Topics",
      icon: <MdAllInclusive className="icon" />,
      active: activeButton === 2,
      path: "/dashboard/topics",
    },
    {
      id: 3,
      text: "My Topics",
      icon: <BsPencil className="icon" />,
      active: activeButton === 3,
      path: `/dashboard/users/${userId}/topics`,
    },
    {
      id: 4,
      text: "Team",
      icon: <RiContactsLine className="icon" />,
      active: activeButton === 4,
      path: "/dashboard/users",
    },
    {
      id: 5,
      text: "Settings",
      icon: <FiSettings className="icon" />,
      active: activeButton === 5,
      path: `/dashboard/users/${userId}/settings`,
    },
  ];
  const handleLogout = () => {
    window.localStorage.removeItem("currentUser");
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <aside className="side-bar">
      <div className="user-profile-area">
        <div className="side-wrapper">
          <div className="topic-manager">Welcome back</div>
          <div className="user-profile">
            <div className="user-name">{name}</div>
            <img src={photo} alt="" className="user-photo" />
            <div className="user-pseudo">{pseudo}</div>
          </div>
        </div>
        <ul className="sidebar-list">
          {sideBarList.map((e) => (
            <SideBarListItems
              key={e.id}
              icon={e.icon}
              text={e.text}
              onClick={() => handleButtonClick(e.id)}
              active={e.active}
              path={e.path}
            />
          ))}
        </ul>
        <Link to="/" className="signOut-btn">
          <button type="button" className="signOut-btn" onClick={handleLogout}>
            Log Out
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
