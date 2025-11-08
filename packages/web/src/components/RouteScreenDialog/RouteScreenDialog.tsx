import { type PropsWithChildren, useEffect, useReducer } from "react";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router";

import ScreenDialog from "../ScreenDialog";

const reducer = (state: Location, action: Location) => action;

type RouteScreenDialogProps = PropsWithChildren<{
  path: string;
}>;

export const RouteScreenDialog = (props: RouteScreenDialogProps) => {
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
    <ScreenDialog open={Boolean(match)}>
      <Routes location={routeLocation}>
        <Route element={children} path={path} />
      </Routes>
    </ScreenDialog>
  );
};
