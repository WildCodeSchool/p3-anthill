import axios from "axios";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

function useFetch({ path, method, body = null }) {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (method === "get" || method === "delete") {
      axios[method](`${URL}/api${path}`, { headers })
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
    } else if (method === "post" || method === "put" || method === "patch") {
      axios[method](`${URL}/api${path}`, body, { headers })
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
    }
  }, [path, method, body]);
  return { data, isSuccess, loading, error };
}

export default useFetch;
