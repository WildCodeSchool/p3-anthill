import "./UserCard.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";

export default function UserCard({ user }) {
  const { toggleMode } = useContext(ToggleModeContext);

  return (
    <div className={!toggleMode ? "userCard__grid" : "userCard__list"}>
      <div className="userCard__header">
        <img className="userCard__picture" src={user.picture} alt="profile" />
        <div className="userCard__names">
          <p className="userCard__name">{user.fullname}</p>
          <p className="userCard__pseudo">{user.pseudo}</p>
        </div>
      </div>
      <div className="userCard__greetings">
        <img className="userCard__mood" alt={user.mood_id} />
        <p>{user.nbr_badges} Badges</p>
      </div>
      <div
        className={
          !toggleMode ? "userCard__contactGrid" : "userCard__contactList"
        }
      >
        <Link to={`/dashboard/users/${user.id}`}>
          <p>Profil</p>
        </Link>
      </div>
    </div>
  );
}
