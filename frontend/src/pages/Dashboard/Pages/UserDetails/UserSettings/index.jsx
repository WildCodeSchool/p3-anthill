import React, { useRef } from "react";
import useCurrentUser from "../../../../../services/useCurrentUser";

import useFetchLazy from "../../../../../services/useFetchLazy";

import "./index.css";

function UserSettings() {
  const { currentUser } = useCurrentUser();
  const refPseudo = useRef();
  const refEmail = useRef();
  const { trigger: triggerPatchSettings } = useFetchLazy({
    path: `/users/${currentUser?.id}`,
    method: "patch",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerPatchSettings({
      pseudo: refPseudo.current.value !== "" ? refPseudo.current.value : null,
      email: refEmail.current.value !== "" ? refEmail.current.value : null,
    });
  };

  return (
    <form className="settings_container" onSubmit={handleSubmit}>
      <label htmlFor="pseudo">update your username</label>
      <input
        id="pseudo"
        className="settings__pseudo"
        placeholder="USERNAME"
        name="Username"
        type="text"
        ref={refPseudo}
      />
      <label htmlFor="email">update your email</label>
      <input
        id="email"
        className="settings__email"
        placeholder="EMAIL"
        name="email"
        type="text"
        ref={refEmail}
      />
      <button className="button" type="submit">
        SUBMIT
      </button>
    </form>
  );
}

export default UserSettings;
