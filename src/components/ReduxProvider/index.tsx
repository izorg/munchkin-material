import PropTypes from "prop-types";
import { type FC } from "react";
import { Provider } from "react-redux";

import store from "../../store";

const ReduxProvider: FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.node,
};

export default ReduxProvider;
