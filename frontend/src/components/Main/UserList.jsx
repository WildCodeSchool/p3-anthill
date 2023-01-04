import useFetch from "../../services/useFetch";
import UserCard from "./User/UserCard";

export default function UserList() {
  const { data: users, loading } = useFetch("/users");

  return (
    <div>
      {loading && <div>LOADING...</div>}
      {users.length &&
        users.map((el) => {
          return <UserCard key={el.id} user={el} />;
        })}
    </div>
  );
}
