import { type PropsWithChildren, useRef } from "react";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router";

import ScreenDialog from "../ScreenDialog";

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
  const locationRef = useRef<Location>(location);

  if (match) {
    // eslint-disable-next-line react-hooks/refs -- will fix later
    locationRef.current = location;
  }

  return (
    <ScreenDialog open={Boolean(match)}>
      {/* eslint-disable-next-line react-hooks/refs -- will fix later */}
      <Routes location={locationRef.current}>
        <Route element={children} path={path} />
      </Routes>
    </ScreenDialog>
  );
};
