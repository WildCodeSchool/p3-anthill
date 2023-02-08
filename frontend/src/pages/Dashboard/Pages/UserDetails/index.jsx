import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../../../services/useFetch";
import "./index.css";

function UserDetails() {
  const { id } = useParams();

  const { data: userBadges, loading: loadingBadges } = useFetch({
    path: `/users/${id}/badges`,
    method: "get",
  });
  const { data: user, loading: loadingUser } = useFetch({
    path: `/users/${id}`,
    method: "get",
  });

  return (
    <div className="userDetail">
      <div className="dashboard__header">
        <div className="dashboard__placeholder" />
        <h1 className="dashboard__title">{`${user.fullname}'s Profile`}</h1>
        <div className="dashboard__placeholder" />
      </div>

      <div className="divider divider__header" />

      <div className="userDetail__card">
        <div className="userDetail__header">
          <div className="userDetail__infos">
            <div className="userDetail__names">
              <h3 className="userDetail__name">{user.fullname}</h3>
              <p className="userDetail__pseudo">{user.pseudo}</p>
            </div>
            <div className="userDetail__greetings">
              <img className="userDetail__mood" alt={user.mood_id} />
              <div className="userDetail__badgesContainer">
                {userBadges &&
                  userBadges.map((badge) => (
                    <div
                      key={badge.badge_id}
                      className="userDetail__badgeUpperContainer"
                    >
                      <div className="userDetail__badgeContainer">
                        <img
                          className={`userDetail__badge__${badge.name}`}
                          alt={badge.name}
                          key={badge.badge_id}
                          src={`/png/${badge.path}`}
                        />
                      </div>
                      <p className="userDetail__badgeName">{badge.name}</p>
                    </div>
                  ))}
                {loadingBadges && <div>LOADING...</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="userDetail__description">
          <p>{user.description}</p>
        </div>
        {loadingUser && <div>LOADING...</div>}
        <div className="userDetail__contact">
          <Link to="topics">
            <p>Show Topics</p>
          </Link>
          <p>Slack</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
