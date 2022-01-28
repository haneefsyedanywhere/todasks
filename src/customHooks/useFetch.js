import { useState, useEffect } from 'react';

const useFetch = (url, fetch) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = (abortController) => {
    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch Aborted!');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    setTimeout(() => {
      fetchData(abortController);
    }, 1000);

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
