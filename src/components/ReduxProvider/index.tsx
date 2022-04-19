import PropTypes from "prop-types";
import { type FC, type ReactNode } from "react";
import { Provider } from "react-redux";

import store from "../../store";

type ReduxProviderProps = {
  children?: ReactNode;
};

const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.node,
};

export default ReduxProvider;
