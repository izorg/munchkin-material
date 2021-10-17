import type { Action, Location } from "history";
import PropTypes from "prop-types";
import { FC, Reducer, useLayoutEffect, useReducer } from "react";
import { Router } from "react-router-dom";

import history from "./history";

type State = { action: Action; location: Location };

const CordovaRouter: FC = ({ children }) => {
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

export default CordovaRouter;
