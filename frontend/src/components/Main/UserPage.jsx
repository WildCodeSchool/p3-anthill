import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./User/UserCard";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserPage() {
  const [users, setUsers] = useState([]);

  async function getUser() {
    await axios
      .get(`${URL}/api/users`)
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
          return <UserCard key={el.id} user={el} />;
        })}
    </div>
  );
}
