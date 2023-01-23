import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetchLazy from "../../../../../services/useFetchLazy";

import "./index.css";

function UserSettings() {
  const navigate = useNavigate();
  const refPseudo = useRef();
  const refEmail = useRef();

  const [userSettings, setUserSettings] = useState({});

  const { trigger: triggerPatchSettings, data } = useFetchLazy({
    path: "/users/1",
    method: "patch",
  });

  const handleSettings = () => {
    setUserSettings((prevState) => {
      return {
        ...prevState,
        pseudo: refPseudo.current.value,
        email: refEmail.current.value,
      };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    triggerPatchSettings(userSettings);
  };

  useEffect(() => {
    if (data?.insertId) {
      navigate(`/dashboard/users/${data.insertId}`);
    }
  }, [data]);

  useEffect(() => {}, [userSettings]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/1")
      .then((res) => res.json())
      .then((res) => setUserSettings(res));
  }, []);

  return (
    <form className="settings_container" onSubmit={submit}>
      <label htmlFor="pseudo">update your username</label>
      <input
        id="pseudo"
        className="settings__pseudo"
        placeholder="USERNAME"
        name="Username"
        type="text"
        ref={refPseudo}
        onChange={handleSettings}
      />
      <label htmlFor="email">update your email</label>
      <input
        id="email"
        className="settings__email"
        placeholder="EMAIL"
        name="email"
        type="text"
        ref={refEmail}
        onChange={handleSettings}
      />
      ;
      <button className="button" type="submit">
        SUBMIT
      </button>
    </form>
  );
}

export default UserSettings;
