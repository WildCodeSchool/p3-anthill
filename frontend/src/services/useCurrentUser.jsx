import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

function useCurrentUser() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
    if (!token) {
      navigate("/login");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${URL}/api/users/currentUser`, {
        headers,
      })
      .then((res) => {
        setCurrentUser(res.data);
        if (res.data.picture) {
          setCurrentUser((prevState) => ({
            ...prevState,
            picture: `${URL}/uploads/${res.data.picture}`,
          }));
        } else {
          setCurrentUser((prevState) => ({
            ...prevState,
            picture: `/png/visitor.png`,
          }));
        }
        if (currentUser?.name === "TokenExpiredError") {
          localStorage.removeItem("currentUser");
          navigate("/login");
        }
      })
      .catch((err) => {
        setError(err.response);
      });
  }, []);

  return { currentUser, error };
}

export default useCurrentUser;
