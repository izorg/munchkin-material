import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const name = "edit";

const useEditMode = (): {
  editMode: boolean;
  setEditMode: (active: boolean) => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();

  const editMode = searchParams.get(name) !== null;

  const setEditMode = useCallback(
    (active: boolean) => {
      setSearchParams((searchParams) => {
        if (active) {
          searchParams.set(name, "");
        } else {
          searchParams.delete(name);
        }

        return searchParams;
      });
    },
    [setSearchParams],
  );

  return useMemo(() => ({ editMode, setEditMode }), [editMode, setEditMode]);
};

export default useEditMode;
