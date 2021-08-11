import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, skip = true, params = {}, headers = {}) => {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (skip) return;
    setState({ isLoading: true, data: null, error: null });
    axios
      .get(url, { ...params }, { ...headers })
      .then((payload) => {
        setState({ isLoading: false, data: payload, error: null });
      })
      .catch((err) => {
        setState({ isLoading: false, data: null, error: err });
      });
  }, [url, params, skip, headers]);

  return state;
};

export default useFetch;
