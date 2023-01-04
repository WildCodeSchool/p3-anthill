import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../services/useFetch";
import "./UserDetails.css";

function UserDetails() {
  const { id } = useParams();
  const { data: userBadges, loadingBadges } = useFetch(`/badges/${id}/badges`);
  const { data: user, loading } = useFetch(`/users/${id}`);

  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <img className="user-detail-picture" alt={user.picture} />
        <div className="user-detail-infos">
          <div className="user-detail-names">
            <h3 className="user-detail-name">{user.fullname}</h3>
            <p className="user-detail-pseudo">{user.pseudo}</p>
          </div>
          <div className="user-detail-greetings">
            <img className="user-detail-mood" alt={user.mood_id} />
            {userBadges &&
              userBadges.map((elt) => (
                <img
                  className="user-detail-badge"
                  alt={elt.picture}
                  key={elt.id}
                />
              ))}
            {loadingBadges && <div>LOADING...</div>}
          </div>
        </div>
      </div>
      <div className="user-detail-description">
        <p>{user.description}</p>
      </div>
      {loading && <div>LOADING...</div>}
      <div className="user-detail-contact">
        <p>Show Topics</p>
        <p>Slack</p>
      </div>
    </div>
  );
}

export default UserDetails;
