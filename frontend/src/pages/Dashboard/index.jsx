import { Outlet } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import useCurrentUser from "../../services/useCurrentUser";

import "./index.css";

function Dashboard() {
  const { currentUser } = useCurrentUser();
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar
        userId={currentUser?.id}
        name={currentUser?.fullname}
        photo={currentUser?.picture}
      />
      <main className="outlet">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
