import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useMenuOpen = (): boolean => {
  const location = useLocation();

  return useMemo(
    () => new URLSearchParams(location.search).get("menu") !== null,
    [location.search]
  );
};

export default useMenuOpen;
