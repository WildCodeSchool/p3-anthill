import { Outlet } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

import "./index.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
