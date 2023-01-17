import { useState } from "react";

import { Link } from "react-router-dom";

import { MdAllInclusive } from "react-icons/md";
import { TbCrown } from "react-icons/tb";
import { GiAnt } from "react-icons/gi";
import { RiContactsLine } from "react-icons/ri";

import SideBarListItems from "../Components/SideBarListItems/SideBarListItems";

import "./Sidebar.css";

function Sidebar({ name, photo }) {
  const [activeButton, setActiveButton] = useState(null);
  const sideBarList = [
    {
      id: 1,
      text: "My Topics",
      icon: <TbCrown className="icon" />,
      active: activeButton === 1,
      path: `/dashboard/users/1/topics`, // getCurrentUser
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
      text: "Co Topics",
      icon: <GiAnt className="icon" />,
      active: activeButton === 3,
      path: "/dashboard",
    },
    {
      id: 4,
      text: "Contacts",
      icon: <RiContactsLine className="icon" />,
      active: activeButton === 4,
      path: "/dashboard/users",
    },
  ];

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
