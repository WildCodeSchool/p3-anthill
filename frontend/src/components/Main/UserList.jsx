import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "./User/UserCard";

export default function UserList() {
  const [users, setUsers] = useState([]);

  async function getUser() {
    await axios
      .get("http://localhost:5000/api/users")
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {users.length &&
        users.map((el) => {
          return (
            <Link to={`/contact/${el.id}`}>
              <UserCard key={el.id} user={el} />
            </Link>
          );
        })}
    </div>
  );
}
