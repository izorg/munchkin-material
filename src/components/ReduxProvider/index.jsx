import PropTypes from "prop-types";
import { Provider } from "react-redux";

import store from "../../store";

const displayName = "ReduxProvider";

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ReduxProvider.displayName = displayName;

export default ReduxProvider;
