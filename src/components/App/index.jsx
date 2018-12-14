import React, { Fragment } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { CssBaseline, withStyles } from '@material-ui/core';

import munchkinWoff from '../../fonts/munchkin.woff';
import munchkinWoff2 from '../../fonts/munchkin.woff2';

import LocaleProvider from '../LocaleProvider';
import { OptionsProvider } from '../OptionsContext';
import Root from '../Root';
import ThemeProvider from '../ThemeProvider';

const styles = {
  '@global': {
    '@font-face': {
      fontFamily: 'Munchkin',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: `
        url(${munchkinWoff2}) format('woff2'),
        url(${munchkinWoff}) format('woff')`,
    },

    html: {
      height: '100%',
      overflow: 'hidden',
      textSizeAdjust: '100%',
    },

    body: {
      height: '100%',
      overflow: 'hidden',
      userSelect: 'none',
      WebkitTouchCallout: 'none', // iOS Safari
      width: '100%',
    },

    '#app': {
      height: '100%',
      position: 'relative',
    },
  },
};

const App = ({ history, keepAwakeSupport, rateLink, shareLink, store }) => (
  <OptionsProvider value={{ keepAwakeSupport, rateLink, shareLink }}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LocaleProvider>
          <ThemeProvider>
            <Fragment>
              <CssBaseline />
              <Root />
            </Fragment>
          </ThemeProvider>
        </LocaleProvider>
      </ConnectedRouter>
    </Provider>
  </OptionsProvider>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
  keepAwakeSupport: PropTypes.bool.isRequired,
  rateLink: PropTypes.string,
  shareLink: PropTypes.string,
  store: PropTypes.object.isRequired,
};

App.defaultProps = {
  rateLink: null,
  shareLink: null,
};

export default compose(
  hot,
  withStyles(styles),
)(App);
