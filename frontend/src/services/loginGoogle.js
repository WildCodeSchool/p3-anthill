import axios from "axios";
import jwtDecode from "jwt-decode";

const GOOGLECLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const URL = import.meta.env.VITE_BACKEND_URL;

const handleCallbackResponse = (response) => {
  const googleToken = response.credential;
  const decodeToken = jwtDecode(googleToken);
  const { sub: googleUserId, name: fullname, email, picture } = decodeToken;
  axios
    .get(`${URL}/api/users/email/${email}`)
    .then((res) => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // window.location.href = "/dashboard";
    })
    .catch((err) => {
      if (err.response.status === 404) {
        axios
          .post(`${URL}/api/users/signupgoogle`, {
            email,
            fullname,
            picture,
            googleUserId,
            pseudo: fullname,
          })
          .then((res) => {
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            // REDIRECTION
          })
          .catch((error) => {
            console.error(error);
          });
        // window.location.href = "/dashboard";
      }
    });
};

const handleLogin = () => {
  try {
    window.google.accounts.id.initialize({
      client_id: GOOGLECLIENTID,
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
