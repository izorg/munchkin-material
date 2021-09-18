import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  const editMode = searchParams.get("edit") !== null;

  const setEditMode = useCallback(
    (active: boolean) => {
      if (active) {
        searchParams.set("edit", "");
      } else {
        searchParams.delete("edit");
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
