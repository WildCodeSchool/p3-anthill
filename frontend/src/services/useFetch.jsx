import axios from "axios";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

function useFetch({ path, method, body = null }) {
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios[method](`${URL}/api${path}`, body)
      .then((res) => {
        setData(res.data);
        setIsSuccess(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path]);
  return { data, isSuccess, loading, error };
}

export default useFetch;
