import PropTypes from "prop-types";
import { Provider } from "react-redux";

import configureStore from "../../store/configureStore";

const displayName = "ReduxProvider";

const store = configureStore();

if (process.env.NODE_ENV === "development") {
  window.reduxStore = store;
}

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ReduxProvider.displayName = displayName;

export default ReduxProvider;
