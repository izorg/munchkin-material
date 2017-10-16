import React from 'react';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import Locale from '../containers/ConnectedIntlProvider';
import munchkinTheme from '../styles/munchkinTheme';

const Root = ({ history, store, ...props }) => (
  <Provider store={store}>
    <Locale>
      <MuiThemeProvider theme={munchkinTheme}>
        <ConnectedRouter history={history}>
          <App {...props} />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Locale>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired, // eslint-disable-line react/no-typos
};

export default Root;
