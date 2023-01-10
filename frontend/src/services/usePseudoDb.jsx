import { useEffect, useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

function useUserDb({ path, body = null }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/api${path}`, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path]);
  return { data, loading, error };
}

export default useUserDb;
