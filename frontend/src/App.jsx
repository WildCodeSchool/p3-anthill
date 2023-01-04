import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Dashboard/Layout/Main";
import TopicsPage from "./pages/Dashboard/Pages/TopicList";
import TopicCommentDetails from "./pages/Dashboard/Pages/TopicCommentDetails";
import UserList from "./pages/Dashboard/Pages/UserList";
import UserDetails from "./pages/Dashboard/Pages/UserDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Main />} />
            <Route path="topics" element={<TopicsPage />} />
            <Route path="topics/:id" element={<TopicCommentDetails />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
