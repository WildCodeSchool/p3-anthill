import React, { useRef, useState, useEffect } from "react";

import useFetchLazy from "../../../../../services/useFetchLazy";
import UploadPicture from "./UploadPicture";

import "./index.css";

function UserSettings() {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const form = document.querySelector("form");
    form.addEventListener("submit", () => setAlert(true));
  }, []);

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
        <UploadPicture />
        <img src="" alt="img" />
        <button className="button" type="submit">
          SUBMIT
        </button>
      </form>
      {alert && <div className="changes">Changes done</div>}
    </div>
  );
}

export default UserSettings;
