import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';

import App from './App';
import { noop } from '../constants';
import Locale from '../containers/ConnectedIntlProvider';
import munchkinWoff from '../fonts/munchkin.woff';
import munchkinWoff2 from '../fonts/munchkin.woff2';
import munchkinTheme from '../styles/munchkinTheme';

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
      '-moz-osx-font-smoothing': 'grayscale',
      '-webkit-font-smoothing': 'antialiased',
    },

    body: {
      height: '100%',
      margin: 0,
      overflow: 'hidden',
      userSelect: 'none',
      width: '100%',
      '-webkit-touch-callout': 'none', /* iOS Safari */
    },

    '#app': {
      height: '100%',
    },
  },
};

class Root extends PureComponent {
  getChildContext() {
    const { buyFullVersion } = this.props;

    return { buyFullVersion };
  }

  render() {
    const { history, store, ...props } = this.props;

    delete props.buyFullVersion;
    delete props.classes;

    return (
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
  }
}

Root.childContextTypes = {
  buyFullVersion: PropTypes.func,
};

Root.propTypes = {
  buyFullVersion: PropTypes.func,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired, // eslint-disable-line react/no-typos
};

Root.defaultProps = {
  buyFullVersion: noop,
};

export default withStyles(styles)(Root);
