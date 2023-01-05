import "./UserCard.css";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  const isClicked = false;

  return (
    <div className={!isClicked ? "userCard__list" : "userCard__grid"}>
      <div className="userCard__header">
        <img className="userCard__picture" alt={user.picture} />
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
          !isClicked ? "userCard__contactList" : "userCard__contactGrid"
        }
      >
        <Link to={`/dashboard/users/${user.id}`}>
          <p>Profil</p>
        </Link>
        <p>Slack</p>
      </div>
    </div>
  );
}