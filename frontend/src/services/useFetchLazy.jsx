import axios from "axios";
import { useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

function useFetchLazy({ path, method }) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const trigger = async (body) => {
    await axios[method](`${URL}/api${path}`, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { trigger, data, loading, error };
}

export default useFetchLazy;
