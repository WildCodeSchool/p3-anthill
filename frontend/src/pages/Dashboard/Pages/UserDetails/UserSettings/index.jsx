import axios from "axios";
import React, { useRef, useState } from "react";
import useCurrentUser from "../../../../../services/useCurrentUser";
import useFetchLazy from "../../../../../services/useFetchLazy";

import "./index.css";

const URL = import.meta.env.VITE_BACKEND_URL;

function UserSettings() {
  const [alert, setAlert] = useState(false);

  const { currentUser } = useCurrentUser();
  const refPseudo = useRef(undefined);
  const refEmail = useRef(undefined);
  const inputRef = useRef(undefined);
  const { trigger: triggerPatchSettings, isSuccess } = useFetchLazy({
    path: `/users/${currentUser?.id}`,
    method: "patch",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerPatchSettings({
      pseudo: refPseudo.current?.value,
      email: refEmail.current?.value,
    });
    e.preventDefault();
  };

  const imageSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", inputRef.current?.files[0]);
    axios
      .post(`${URL}/api/users/${currentUser?.id}/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("currentUser"))?.token
          }`,
        },
      })
      .then(() => {
        setAlert(true);
      })
      .catch((err) => {
        console.error(err);
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
        <button className="settings__btn" type="submit">
          SUBMIT
        </button>
        {isSuccess && <div>Changes done</div>}
      </form>
      <form
        className="settings_container"
        encType="multipart/form-data"
        onSubmit={imageSubmit}
      >
        <input type="file" name="picture" ref={inputRef} />
        <button type="submit">SUBMIT</button>
        {alert && <div>Changes done, please reload to see changes</div>}
      </form>
    </div>
  );
}

export default UserSettings;
