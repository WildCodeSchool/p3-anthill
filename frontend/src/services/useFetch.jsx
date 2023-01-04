import axios from "axios";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

const useFetch = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/api${path}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [path]);
  return { data, loading, error };
};

export default useFetch;
