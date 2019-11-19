import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

const displayName = 'ReduxProvider';

const ReduxProvider = ({ children, history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>{children}</ConnectedRouter>
  </Provider>
);

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

ReduxProvider.displayName = displayName;

export default ReduxProvider;
