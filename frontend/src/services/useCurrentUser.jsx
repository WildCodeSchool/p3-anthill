import { useState, useEffect } from "react";

function useCurrentUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("currentUser");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
}

export default useCurrentUser;
