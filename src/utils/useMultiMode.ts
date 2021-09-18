import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const key = "multi";

const useMultiMode = (): {
  multiMode: boolean;
  setMultiMode: (active: boolean) => void;
} => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const multiMode = searchParams.get(key) !== null;

  const setMultiMode = useCallback(
    (active: boolean) => {
      if (active) {
        searchParams.set(key, "");
      } else {
        searchParams.delete(key);
      }

      const search = searchParams.toString();

      navigate({
        search: search ? `?${search}` : "",
      });
    },
    [navigate, searchParams]
  );

  return { multiMode, setMultiMode };
};

export default useMultiMode;
