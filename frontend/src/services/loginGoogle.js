import jwtDecode from "jwt-decode";
import axios from "axios";

const GOOGLE_CLIENT_ID =
  "380173514511-nl7hpviphofn124ghjirsanfsq7b3ikd.apps.googleusercontent.com";

const handleCallbackResponse = (response) => {
  const token = response.credential;
  const decodeToken = jwtDecode(token);
  const { sub: googleUserId, name: fullname, email, picture } = decodeToken;

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ googleUserId, fullname, email, picture })
  );
  const data = JSON.parse(localStorage.getItem("currentUser"));

  axios.post("http://localhost:5000/api/users", {
    email: data.email,
    fullname: data.fullname,
    picture: data.picture,
    googleId: data.googleUserId,
  });
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
