import { useCallback } from "react";
import { useSearchParams } from "react-router";

const key = "multi";

const useMultiMode = (): {
  multiMode: boolean;
  setMultiMode: (active: boolean) => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const multiMode = searchParams.get(key) !== null;

  const setMultiMode = useCallback(
    (active: boolean) => {
      setSearchParams((searchParams) => {
        if (active) {
          searchParams.set(key, "");
        } else {
          searchParams.delete(key);
        }

        return searchParams;
      });
    },
    [setSearchParams],
  );

  return { multiMode, setMultiMode };
};

export default useMultiMode;
