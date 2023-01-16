import axios from "axios";
import jwtDecode from "jwt-decode";

const GOOGLE_CLIENT_ID =
  "380173514511-nl7hpviphofn124ghjirsanfsq7b3ikd.apps.googleusercontent.com";
const URL = import.meta.env.VITE_BACKEND_URL;

const handleCallbackResponse = (response) => {
  const token = response.credential;
  const decodeToken = jwtDecode(token);
  const { sub: googleUserId, name: fullname, email, picture } = decodeToken;
  axios
    .get(`${URL}/api/users/email/${email}`)
    .then(() => {
      window.location.href = "/dashboard";
    })
    .catch((err) => {
      if (err.response.status === 404) {
        axios.post(`${URL}/api/users`, {
          email,
          fullname,
          picture,
          googleUserId,
          pseudo: fullname,
        });
        window.location.href = "/dashboard";
      }
    });
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ googleUserId, fullname, email, picture })
  );
};

const handleLogin = () => {
  try {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        throw new Error("Try to clear the cookies or try again later!");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export default handleLogin;
