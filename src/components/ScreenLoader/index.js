import { createElement, PureComponent } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

import LoadingScreen from '../LoadingScreen';

let fabAppear = false;

class ScreenLoader extends PureComponent {
  constructor(props) {
    super(props);

    const { match } = props;

    const isMatch = Boolean(match);

    this.loadableScreen = Loadable({
      loader: props.loader,
      // page loading with current screen - show loading screen until ready
      loading: isMatch ? LoadingScreen : () => null,
    });

    this.state = {
      // no animation if it's a page load, otherwise - show enter animation
      appear: !isMatch,
      // show loading until file loaded on page load
      ready: match && match.isExact,
      // eslint-disable-next-line react/no-unused-state
      prevMatch: match,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match } = props;
    const { prevMatch, ready } = state;

    let derivedState = null;

    if (match !== prevMatch) {
      derivedState = {
        ...derivedState,
        appear: !prevMatch && match && match.isExact,
        prevMatch: match,
      };

      if (!ready && match && match.isExact) {
        derivedState = {
          ...derivedState,
          ready: true,
        };
      }
    }

    return derivedState;
  }

  componentDidMount() {
    fabAppear = true;
  }

  componentDidUpdate() {
    const { ready } = this.state;
    const { match, theme } = this.props;

    if (this.readyTimeout && match && match.isExact) {
      clearTimeout(this.readyTimeout);

      this.readyTimeout = null;
    }

    if ((!match || !match.isExact) && ready) {
      this.readyTimeout = setTimeout(
        () => this.setState({ ready: false }),
        theme.transitions.duration.enteringScreen * 2,
      );
    }
  }

  render() {
    const { appear, ready } = this.state;

    return ready
      ? createElement(this.loadableScreen, { appear, fabAppear, ...this.props })
      : null;
  }
}

ScreenLoader.propTypes = {
  loader: PropTypes.func.isRequired,
  match: PropTypes.object,
};

ScreenLoader.defaultProps = {
  match: null,
};

export default withTheme()(ScreenLoader);
