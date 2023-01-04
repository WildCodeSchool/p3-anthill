import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
