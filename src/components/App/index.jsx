import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import compose from 'recompose/compose';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';

import LocaleProvider from '../LocaleProvider';
import ThemeProvider from '../ThemeProvider';
import munchkinWoff from '../../fonts/munchkin.woff';
import munchkinWoff2 from '../../fonts/munchkin.woff2';
import Root from '../Root';

const styles = {
  '@global': {
    '@font-face': {
      fontFamily: 'Munchkin',
      src: `
        url(${munchkinWoff2}) format('woff2'),
        url(${munchkinWoff}) format('woff')`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },

    html: {
      height: '100%',
      lineHeight: 1.15,
      overflow: 'hidden',
      textSizeAdjust: '100%',
    },

    body: {
      backgroundColor: '#FFFFFF',
      height: '100%',
      overflow: 'hidden',
      userSelect: 'none',
      width: '100%',
      '-webkit-touch-callout': 'none' /* iOS Safari */,
    },

    '#app': {
      height: '100%',
      position: 'relative',
    },
  },
};

class App extends PureComponent {
  getChildContext() {
    const { buyFullVersion, keepAwakeSupport } = this.props;

    return { buyFullVersion, keepAwakeSupport };
  }

  render() {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <LocaleProvider>
          <ThemeProvider>
            <Reboot>
              <ConnectedRouter history={history}>
                <Root />
              </ConnectedRouter>
            </Reboot>
          </ThemeProvider>
        </LocaleProvider>
      </Provider>
    );
  }
}

App.childContextTypes = {
  buyFullVersion: PropTypes.func,
  keepAwakeSupport: PropTypes.bool,
};

App.propTypes = {
  buyFullVersion: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  keepAwakeSupport: PropTypes.bool.isRequired,
  store: storeShape.isRequired, // eslint-disable-line react/no-typos
};

export default compose(hot(module), withStyles(styles))(App);
