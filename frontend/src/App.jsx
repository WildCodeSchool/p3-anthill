import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./components/Main/UserDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
