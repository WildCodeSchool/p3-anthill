import { Outlet } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

import "./index.css";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="dashboard">
      <Navbar name={currentUser.fullname} photo={currentUser.picture} />
      <Sidebar name={currentUser.fullname} photo={currentUser.picture} />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
