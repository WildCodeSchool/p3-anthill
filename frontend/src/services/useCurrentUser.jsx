import { useState, useEffect } from "react";

function useCurrentUser() {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setIsUser(true);
    }
  }, []);

  return isUser;
}

export default useCurrentUser;
