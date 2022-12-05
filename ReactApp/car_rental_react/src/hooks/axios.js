import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// create custom hooks for fetching data
const useGet = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(() => {
    if (url) {
      setLoading(true);
      axios
        .get(url)
        .then((response) => setData(response.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  },[url,setData,setError,setLoading])

  useEffect(refetch, [refetch]);

  return { data, error, loading, refetch };
};

const useMutate = ({ url, onCompleted = () => {}, method = "POST" }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const mutate = ({ data }) => {
    axios({ url, method, data })
      .then((r) => {
        setData(r.data);
        onCompleted?.();
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  return [mutate, { data, error, loading }];
};

export { useMutate, useGet };
