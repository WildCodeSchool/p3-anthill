import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../services/useFetch";
import "./index.css";

function UserDetails() {
  const { id } = useParams();
  const { data: userBadges, loading: loadingBadges } = useFetch({
    path: `/badges/${id}/badges`,
    method: "get",
  });
  const { data: user, loading: loadingUser } = useFetch({
    path: `/users/${id}`,
    method: "get",
  });

  return (
    <div className="userDetail">
      <div className="userDetail__card">
        <div className="userDetail__header">
          <img className="userDetail__picture" alt={user.picture} />
          <div className="userDetail__infos">
            <div className="userDetail__names">
              <h3 className="userDetail__name">{user.fullname}</h3>
              <p className="userDetail__pseudo">{user.pseudo}</p>
            </div>
            <div className="userDetail__greetings">
              <img className="userDetail__mood" alt={user.mood_id} />
              {userBadges &&
                userBadges.map((elt) => (
                  <img
                    className="userDetail__badge"
                    alt={elt.picture}
                    key={elt.id}
                  />
                ))}
              {loadingBadges && <div>LOADING...</div>}
            </div>
          </div>
        </div>

        <div className="userDetail__description">
          <p>{user.description}</p>
        </div>
        {loadingUser && <div>LOADING...</div>}
        <div className="userDetail__contact">
          <p>Show Topics</p>
          <p>Slack</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
