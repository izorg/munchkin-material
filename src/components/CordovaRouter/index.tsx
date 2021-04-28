import type { Action, Location } from "history";
import PropTypes from "prop-types";
import {
  FC,
  PropsWithChildren,
  Reducer,
  useLayoutEffect,
  useReducer,
} from "react";
import { Router } from "react-router-dom";

const displayName = "CordovaRouter";

import history from "./history";

type State = { action: Action; location: Location };

const CordovaRouter: FC<PropsWithChildren<void>> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, State>>(
    (_, action) => action,
    {
      action: history.action,
      location: history.location,
    }
  );

  useLayoutEffect(() => history.listen(dispatch), []);

  return (
    <Router action={state.action} location={state.location} navigator={history}>
      {children}
    </Router>
  );
};

CordovaRouter.propTypes = {
  children: PropTypes.node,
};

CordovaRouter.displayName = displayName;

export default CordovaRouter;
