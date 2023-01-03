import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <Main />
    </div>
  );
}

export default Dashboard;
