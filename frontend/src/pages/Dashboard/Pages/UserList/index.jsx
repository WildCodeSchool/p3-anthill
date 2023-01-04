import useFetch from "../../../../services/useFetch";
import UserCard from "../../Components/UserCard";
import ToggleMode from "../../Components/ToggleMode";

export default function UserList() {
  const { data: users, loading } = useFetch("/users");
  return (
    <div>
      <ToggleMode />
      {loading && <div>LOADING...</div>}
      {users.length &&
        users.map((el) => {
          return <UserCard key={el.id} user={el} />;
        })}
    </div>
  );
}
