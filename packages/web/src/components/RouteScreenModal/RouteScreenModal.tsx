import { configureStore } from "@reduxjs/toolkit";
import { type PropsWithChildren, useEffect, useMemo, useReducer } from "react";
import { Provider } from "react-redux";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router";

import { RouteModal } from "../../domains/ui";
import store, { createRootReducer } from "../../store";

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

  const open = Boolean(match);

  const routeStore = useMemo(
    () =>
      open
        ? store
        : configureStore({
            preloadedState: store.getState(),
            reducer: createRootReducer(),
          }),
    [open],
  );

  const location = useLocation();

  const [routeLocation, dispatchRouteLocation] = useReducer(reducer, location);

  useEffect(() => {
    if (match) {
      dispatchRouteLocation(location);
    }
  }, [location, match]);

  return (
    <RouteModal open={open}>
      <Provider store={routeStore}>
        <Routes location={routeLocation}>
          <Route element={children} path={path} />
        </Routes>
      </Provider>
    </RouteModal>
  );
};
