import React, { useRef } from "react";
import { GiAnt } from "react-icons/gi";
import { IoIosAt } from "react-icons/io";
import useFetchLazy from "../../../../../services/useFetchLazy";

import "./index.css";

function UserSettings() {
  const refPseudo = useRef();
  const refEmail = useRef();

  const { trigger: triggerPatchSettings } = useFetchLazy({
    path: "/users/1",
    method: "patch",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerPatchSettings({
      pseudo: refPseudo.current.value,
      email: refEmail.current.value,
    });
  };

  return (
    <div className="settings_container">
      <form className="settings_form" onSubmit={handleSubmit}>
        <p className="settings__title">Update your info</p>
        <label htmlFor="pseudo"> </label>
        <GiAnt className="settings__antIcon" />
        <input
          id="pseudo"
          className="settings__input"
          placeholder="Your Pseudo"
          name="Username"
          type="text"
          ref={refPseudo}
        />
        <label htmlFor="email"> </label>

        <IoIosAt className="settings__emailIcon" />
        <input
          id="email"
          className="settings__input"
          placeholder="Your Email"
          name="email"
          type="text"
          ref={refEmail}
        />
        <div className="settings__button">
          <button className="btn" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSettings;
