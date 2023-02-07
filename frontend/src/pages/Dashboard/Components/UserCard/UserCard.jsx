import "./UserCard.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import useFetch from "../../../../services/useFetch";

export default function UserCard({ user }) {
  const { toggleMode } = useContext(ToggleModeContext);

  const { data: userBadges, loading: loadingBadges } = useFetch({
    path: `/users/${user.id}/badges`,
    method: "get",
  });

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
        <div className="userCard__badgesContainer">
          {userBadges &&
            userBadges.map((badge) => (
              <div
                key={badge.badge_id}
                className="userCard__badgeUpperContainer"
              >
                <div className="userCard__badgeContainer">
                  <img
                    className={`userCard__badge__${badge.name}`}
                    alt={badge.name}
                    key={badge.badge_id}
                    src={`/png/${badge.path}`}
                  />
                  <p className="userCard__badgeName">{badge.name}</p>
                </div>
              </div>
            ))}
          {loadingBadges && <div>LOADING...</div>}
        </div>
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
