import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../store/configureStore';

const displayName = 'ReduxProvider';

const ReduxProvider = ({ children }) => {
  const store = useMemo(() => configureStore(), []);

  if (process.env.NODE_ENV === 'development') {
    window.reduxStore = store;
  }

  return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ReduxProvider.displayName = displayName;

export default ReduxProvider;
