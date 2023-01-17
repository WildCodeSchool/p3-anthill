import { Link } from "react-router-dom";

function SideBarListItems({ icon, onClick, text, active, path }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <li className={`sidebar-listItem${active ? " active" : ""}`}>
      <Link to={path}>
        <button type="button" onClick={handleClick}>
          {icon}
          <span className="sidebar-listItemText">{text}</span>
        </button>
      </Link>
    </li>
  );
}

export default SideBarListItems;
