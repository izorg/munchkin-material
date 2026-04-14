import { type PropsWithChildren, useEffect, useReducer } from "react";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router";

import { ScreenModal } from "../ScreenModal";

const reducer = (state: Location, action: Location) => action;

type RouteScreenModalProps = PropsWithChildren<{
  path: string;
}>;

export const RouteScreenModal = (props: RouteScreenModalProps) => {
  const { children, path } = props;

  const match = useMatch({
    end: false,
    path,
  });

  const location = useLocation();

  const [routeLocation, dispatchRouteLocation] = useReducer(reducer, location);

  useEffect(() => {
    if (match) {
      dispatchRouteLocation(location);
    }
  }, [location, match]);

  return (
    <ScreenModal open={Boolean(match)}>
      <Routes location={routeLocation}>
        <Route element={children} path={path} />
      </Routes>
    </ScreenModal>
  );
};
