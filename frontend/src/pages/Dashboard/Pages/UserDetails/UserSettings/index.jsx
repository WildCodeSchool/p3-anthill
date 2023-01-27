import React, { useRef, useState } from "react";

import useFetchLazy from "../../../../../services/useFetchLazy";

import "./index.css";

function UserSettings() {
  const [alert, setAlert] = useState(false);

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
    e.preventDefault();
    setAlert(true);
  };

  return (
    <div>
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
        <img src="" alt="img" />
        <button className="settings__btn" type="submit">
          SUBMIT
        </button>
        {alert && <div>Changes done</div>}
      </form>
    </div>
  );
}

export default UserSettings;
