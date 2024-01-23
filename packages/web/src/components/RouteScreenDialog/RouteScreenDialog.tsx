import { type PropsWithChildren, useRef } from "react";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router-dom";

import ScreenDialog from "../ScreenDialog";

type RouteScreenDialogProps = PropsWithChildren<{
  path: string;
}>;

export const RouteScreenDialog = (props: RouteScreenDialogProps) => {
  const { children, path } = props;

  const match = useMatch(path);

  const location = useLocation();
  const locationRef = useRef<Location>();

  if (match) {
    locationRef.current = location;
  }

  return (
    <ScreenDialog open={Boolean(match)}>
      <Routes location={location}>
        <Route element={children} path={path} />
      </Routes>
    </ScreenDialog>
  );
};
