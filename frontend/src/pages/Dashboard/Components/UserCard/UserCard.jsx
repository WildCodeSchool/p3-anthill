import "./UserCard.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";

const URL = import.meta.env.VITE_BACKEND_URL;

export default function UserCard({ user }) {
  const { toggleMode } = useContext(ToggleModeContext);

  let photo = "";
  if (user.picture) {
    if (user.picture.includes("http")) {
      photo = user.picture;
    } else {
      photo = `${URL}/uploads/${user.picture}`;
    }
  } else {
    photo = "/png/visitor.png";
  }

  return (
    <div className={!toggleMode ? "userCard__grid" : "userCard__list"}>
      <div className="userCard__header">
        <img className="userCard__picture" src={photo} alt="profile" />
        <div className="userCard__names">
          <p className="userCard__name">{user.fullname}</p>
          <p className="userCard__pseudo">{user.pseudo}</p>
        </div>
      </div>

      <div
        className={
          !toggleMode ? "userCard__contactGrid" : "userCard__contactList"
        }
      >
        <div className="userCard__greetings">
          <p>{user.nbr_badges} Badges</p>
        </div>
        <Link to={`/dashboard/users/${user.id}`}>
          <p>Profil</p>
        </Link>
      </div>
    </div>
  );
}
