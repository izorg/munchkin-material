import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const name = "edit";

const useEditMode = (): {
  editMode: boolean;
  setEditMode: (active: boolean) => void;
} => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const editMode = searchParams.get(name) !== null;

  const setEditMode = useCallback(
    (active: boolean) => {
      if (active) {
        searchParams.set(name, "");
      } else {
        searchParams.delete(name);
      }

      const search = searchParams.toString();

      navigate({
        search: search ? `?${search}` : "",
      });
    },
    [navigate, searchParams]
  );

  return { editMode, setEditMode };
};

export default useEditMode;
