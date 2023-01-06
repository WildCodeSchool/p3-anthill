import { useContext } from "react";
import useFetch from "../../../../services/useFetch";
import UserCard from "../../Components/UserCard";
import ToggleModeButtons from "../../Components/ToggleModeButtons";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import "./UserList.css";

export default function UserList() {
  const { data: users, loading } = useFetch("/users");
  const { toggleMode } = useContext(ToggleModeContext);
  return (
    <div>
      <ToggleModeButtons />
      {loading && <div>LOADING...</div>}
      <div
        className={!toggleMode ? "userList__list__main" : "userList_grid__main"}
      >
        {users.length &&
          users.map((el) => {
            return <UserCard key={el.id} user={el} />;
          })}
      </div>
    </div>
  );
}
