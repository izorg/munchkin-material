import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../store/configureStore';

const ReduxProvider = ({ children }) => {
  const store = configureStore();

  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }

  return <Provider store={store}>{children}</Provider>;
};

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ReduxProvider.displayName = 'ReduxProvider';

export default ReduxProvider;
