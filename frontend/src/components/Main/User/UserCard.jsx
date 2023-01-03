import "./UserCard.css";
import { Link } from "react-router-dom";
// import { useState } from "react";

export default function UserCard({ user }) {
  // il faudra changer ça en un useContext pour vérifier si le bouton Grid est cliqué
  // const [isClicked, setIsClicked] = useState(false);
  const isClicked = false;

  return (
    <div className={!isClicked ? "user-list" : "user-grid"}>
      <div className="user-header">
        <img className="user-picture" alt={user.picture} />
        <div className="user-names">
          <p className="user-name">{user.fullname}</p>
          <p className="user-pseudo">{user.pseudo}</p>
        </div>
      </div>
      <div className="user-greetings">
        <img className="user-mood" alt={user.mood_id} />
        <p>{user.nbr_badges} Badges</p>
      </div>
      <div className={!isClicked ? "user-contact-list" : "user-contact-grid"}>
        <Link to={`/contact/${user.id}`}>
          <p>Profil</p>
        </Link>
        <p>Slack</p>
      </div>
    </div>
  );
}
