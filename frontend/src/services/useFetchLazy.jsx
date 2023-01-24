import axios from "axios";
import { useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

function useFetchLazy({ path, method }) {
  const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [data, setData] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trigger = async (body) => {
    setLoading(true);
    if (method === "get" || method === "delete") {
      await axios[method](`${URL}/api${path}`, { headers })
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
      await axios[method](`${URL}/api${path}`, body, { headers })
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
  };
  return { trigger, data, isSuccess, loading, error };
}

export default useFetchLazy;
