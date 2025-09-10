import { useEffect, useState } from "react";

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFn()
      .then(setData)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, loading, error, setData };
}
