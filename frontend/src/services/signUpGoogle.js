import jwtDecode from "jwt-decode";
import axios from "axios";

const GOOGLE_CLIENT_ID =
  "380173514511-nl7hpviphofn124ghjirsanfsq7b3ikd.apps.googleusercontent.com";
const URL = import.meta.env.VITE_BACKEND_URL;
const handleCallbackGetResponse = () => {
  const data = JSON.parse(localStorage.getItem("currentUser"));

  axios.post(`${URL}/api/users`, {
    email: data.email,
    fullname: data.fullname,
    picture: data.picture,
    googleId: data.googleUserId,
  });
};

const handleCallbackResponse = (response) => {
  const token = response.credential;
  const decodeToken = jwtDecode(token);
  const { sub: googleUserId, name: fullname, email, picture } = decodeToken;

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ googleUserId, fullname, email, picture })
  );
  handleCallbackGetResponse();
};

const handleSignUp = async () => {
  try {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        throw new Error("Try to clear the cookies or try again later!");
      }
      if (notification.j) {
        window.location.href = "/dashboard";
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export default handleSignUp;
