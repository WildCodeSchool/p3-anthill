import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TopicCommentDetails from "./components/Main/Topic/Comment/TopicCommentDetails";
import Main from "./components/Main";
import TopicsPage from "./components/Main/TopicsPage";
import UserList from "./components/Main/UserList";
import UserDetails from "./components/Main/UserDetails";

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
