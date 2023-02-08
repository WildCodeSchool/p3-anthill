import { useContext } from "react";
import useFetch from "../../../../services/useFetch";
import UserCard from "../../Components/UserCard/UserCard";
import ToggleModeButtons from "../../Components/ToggleModeButtons/ToggleModeButtons";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import "./index.css";

export default function UserList() {
  const { data: users, loading } = useFetch({
    path: "/users",
    method: "get",
  });
  const { toggleMode } = useContext(ToggleModeContext);
  return (
    <div className="userList">
      <div className="dashboard__header">
        <div className="dashboard__placeholder" />
        <h1 className="dashboard__title">Team</h1>
        <ToggleModeButtons />
      </div>

      <div className="divider divider__header" />

      {loading && <div>LOADING...</div>}
      <div
        className={!toggleMode ? "userList_grid__main" : "userList__list__main"}
      >
        {users.length &&
          users.map((el) => {
            return <UserCard key={el.id} user={el} />;
          })}
      </div>
    </div>
  );
}
