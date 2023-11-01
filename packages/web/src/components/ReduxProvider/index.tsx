import PropTypes from "prop-types";
import { type FC, type PropsWithChildren } from "react";
import { Provider } from "react-redux";

import store from "../../store";

const ReduxProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.node,
};

export default ReduxProvider;
