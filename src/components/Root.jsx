import React from 'react';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../containers/App';
import Locale from '../containers/ConnectedIntlProvider';
import munchkinTheme from '../styles/munchkinTheme';

const Root = ({ history, store }) => (
  <Provider store={store}>
    <Locale>
      <MuiThemeProvider muiTheme={getMuiTheme(munchkinTheme)}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Locale>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired,
};

export default Root;
