import { useState } from "react";

import { Link } from "react-router-dom";

import { MdAllInclusive } from "react-icons/md";
import { TbCrown } from "react-icons/tb";
import { BsPencil } from "react-icons/bs";
import { GiAnt } from "react-icons/gi";
import { RiContactsLine } from "react-icons/ri";

import SideBarListItems from "../Components/SideBarListItems/SideBarListItems";

import "./Sidebar.css";

function Sidebar({ userId, name, photo }) {
  const [activeButton, setActiveButton] = useState(null);
  const sideBarList = [
    {
      id: 1,
      text: "Top Topics",
      icon: <TbCrown className="icon" />,
      active: activeButton === 1,
      path: `/dashboard`, // getCurrentUser
    },
    {
      id: 2,
      text: "My Topics",
      icon: <BsPencil className="icon" />,
      active: activeButton === 2,
      path: `/dashboard/users/${userId}/topics`,
    },
    {
      id: 3,
      text: "All Topics",
      icon: <MdAllInclusive className="icon" />,
      active: activeButton === 3,
      path: "/dashboard/topics",
    },
    {
      id: 4,
      text: "Co Topics",
      icon: <GiAnt className="icon" />,
      active: activeButton === 4,
      path: "/dashboard",
    },
    {
      id: 5,
      text: "Contacts",
      icon: <RiContactsLine className="icon" />,
      active: activeButton === 5,
      path: "/dashboard/users",
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
        <div className="topic-manager">Welcome back</div>
        <div className="side-wrapper">
          <div className="user-profile">
            <div className="user-name">{name}</div>
            <img src={photo} alt="" className="user-photo" />
            <div className="user-mood">Mood</div>
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
        <Link to="/login" className="signOut-btn">
          <button type="button" className="signOut-btn" onClick={handleLogout}>
            Log Out
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
