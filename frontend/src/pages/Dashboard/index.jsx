import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

import "./index.css";

function Dashboard() {
  useEffect(() => {
    if (localStorage.length === 0) {
      console.error("Empty Local storage");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          fullname: "John Doe",
          picture: "png/creator.png",
        })
      );
    }
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="dashboard">
      <Navbar name={currentUser?.fullname} photo={currentUser?.picture} />
      <Sidebar name={currentUser?.fullname} photo={currentUser?.picture} />
      <main className="outlet">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
