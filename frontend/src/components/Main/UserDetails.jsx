import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserDetails.css";

function UserDetails() {
  const [user, setUser] = useState([]);
  const [badges, setBadges] = useState([]);
  const { id } = useParams();

  async function getBadgesFromOneUser() {
    await axios
      .get(`http://localhost:5000/api/users/${id}/badges`)
      .then((res) => res.data)
      .then((data) => {
        setBadges(data);
      });
  }
  async function getOneUser() {
    await axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
      });
  }
  useEffect(() => {
    getOneUser();
    getBadgesFromOneUser();
  }, []);

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
            {badges &&
              badges.map((elt) => (
                <img className="user-detail-badge" alt={elt.picture} />
              ))}
          </div>
        </div>
      </div>
      <div className="user-detail-description">
        <p>{user.description}</p>
      </div>
      <div className="user-detail-contact">
        <p>Show Topics</p>
        <p>Slack</p>
      </div>
    </div>
  );
}

export default UserDetails;
