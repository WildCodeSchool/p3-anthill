import axios from "axios";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

function useFetch({ path, method, body = undefined }) {
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
    axios({
      method,
      url: `${URL}/api${path}`,
      data: body,
      headers,
    })
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
  }, [path, method, body]);
  return { data, isSuccess, loading, error };
}

export default useFetch;
