import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

const displayName = 'StoreProvider';

const StoreProvider = ({ children, history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>{children}</ConnectedRouter>
  </Provider>
);

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

StoreProvider.displayName = displayName;

export default StoreProvider;
