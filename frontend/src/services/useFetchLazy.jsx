import axios from "axios";
import { useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

function useFetchLazy({ path, method }) {
  const [data, setData] = useState(undefined);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const trigger = async (body) => {
    setLoading(true);
    await axios[method](`${URL}/api${path}`, body)
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
  };
  return { trigger, data, isSuccess, loading, error };
}

export default useFetchLazy;
