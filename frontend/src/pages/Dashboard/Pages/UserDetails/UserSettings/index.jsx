import axios from "axios";
import React, { useRef, useState } from "react";
import { GiAnt } from "react-icons/gi";
import { IoIosAt } from "react-icons/io";
import useCurrentUser from "../../../../../services/useCurrentUser";
import useFetchLazy from "../../../../../services/useFetchLazy";

import "./index.css";

const { VITE_BACKEND_URL } = import.meta.env;

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
      .post(
        `${VITE_BACKEND_URL}/api/users/${currentUser?.id}/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("currentUser"))?.token
            }`,
          },
        }
      )
      .then(() => {
        setAlert(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [image, setImage] = useState("");

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="settings-main">
      <form className="settings-container" onSubmit={handleSubmit}>
        <p className="update-title">Update informations</p>
        <div>
          <GiAnt className="icons-settings-ant" />
          <input
            id="pseudo"
            className="form-style"
            placeholder="Your Pseudo"
            name="Username"
            type="text"
            ref={refPseudo}
          />
          <IoIosAt className="icons-settings-email" />
          <input
            id="email"
            className="form-style"
            placeholder="Your Email"
            name="email"
            type="text"
            ref={refEmail}
          />
        </div>

        <button className="btn" type="submit">
          SUBMIT
        </button>
        {isSuccess && (
          <div className="settings-message">
            Changes done, please reload to see changes
          </div>
        )}
      </form>
      <form
        className="settings-container"
        encType="multipart/form-data"
        onSubmit={imageSubmit}
      >
        <label htmlFor="email">Update profile picture</label>
        <img className="image-preview" src={image} alt="" />
        <input
          id="picture-input"
          type="file"
          name="picture"
          onChange={onImageChange}
          ref={inputRef}
          accept=".png,.jpg,.jpeg"
        />
        <button type="submit" className="btn">
          SUBMIT
        </button>
        {alert && (
          <div className="settings-message">
            Changes done, please reload to see changes
          </div>
        )}
      </form>
    </div>
  );
}

export default UserSettings;
