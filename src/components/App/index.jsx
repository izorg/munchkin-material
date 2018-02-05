import React, { Fragment, PureComponent } from 'react';
import Helmet from 'react-helmet/lib/Helmet';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import compose from 'recompose/compose';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';
import o9n from 'o9n';

import LocaleProvider from '../LocaleProvider';
import munchkinWoff from '../../fonts/munchkin.woff';
import munchkinWoff2 from '../../fonts/munchkin.woff2';
import Root from '../Root';
import munchkinTheme from '../../styles/munchkinTheme';

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

const getOrientation = () => o9n.orientation.type.split('-')[0];

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      orientation: getOrientation(),
    };

    this.updateOrientation = this.updateOrientation.bind(this);
  }

  getChildContext() {
    const { buyFullVersion } = this.props;

    return { buyFullVersion };
  }

  componentDidMount() {
    o9n.orientation.addEventListener('change', this.updateOrientation);
  }

  componentWillUnmount() {
    o9n.orientation.removeEventListener('change', this.updateOrientation);
  }

  updateOrientation() {
    this.setState({
      orientation: getOrientation(),
    });
  }

  render() {
    const { history, store } = this.props;
    const { orientation } = this.state;

    return (
      <Fragment>
        <Helmet>
          <html lang={navigator.language} />
          <body className={orientation} />
        </Helmet>

        <Provider store={store}>
          <LocaleProvider>
            <MuiThemeProvider theme={munchkinTheme}>
              <Reboot>
                <ConnectedRouter history={history}>
                  <Root />
                </ConnectedRouter>
              </Reboot>
            </MuiThemeProvider>
          </LocaleProvider>
        </Provider>
      </Fragment>
    );
  }
}

App.childContextTypes = {
  buyFullVersion: PropTypes.func,
};

App.propTypes = {
  buyFullVersion: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired, // eslint-disable-line react/no-typos
};

export default compose(hot(module), withStyles(styles))(App);
