import jwtDecode from "jwt-decode";

const handleCallbackResponse = (response) => {
  const token = response.credential;
  const decodeToken = jwtDecode(token);
  const { sub: password, name: fullname, email, picture } = decodeToken;
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ password, fullname, email, picture })
  );
};

const handleLogin = () => {
  try {
    window.google.accounts.id.initialize({
      client_id:
        "380173514511-nl7hpviphofn124ghjirsanfsq7b3ikd.apps.googleusercontent.com",
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
