import { matchPath, useLocation } from "react-router";

const useScreenView = (): string | undefined => {
  const { pathname } = useLocation();

  if (
    matchPath(
      {
        end: false,
        path: "/player/:id/combat",
      },
      pathname,
    )
  ) {
    return "Combat";
  }

  if (
    matchPath(
      {
        end: false,
        path: "/player/:id",
      },
      pathname,
    )
  ) {
    return "Player";
  }

  if (pathname === "/") {
    return "Home";
  }

  return undefined;
};

export default useScreenView;
