import PropTypes from "prop-types";
import { useMemo } from "react";
import { Provider } from "react-redux";

import getStore from "../../store/getStore";

const displayName = "ReduxProvider";

const ReduxProvider = ({ children }) => {
  const store = useMemo(() => getStore(), []);

  return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ReduxProvider.displayName = displayName;

export default ReduxProvider;
