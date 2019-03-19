import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

const ReduxProvider = ({ children, history, store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default ReduxProvider;
