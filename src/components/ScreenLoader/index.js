import { createElement, PureComponent } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

import LoadingScreen from '../LoadingScreen';

class ScreenLoader extends PureComponent {
  constructor(props) {
    super(props);

    const isMatch = Boolean(props.match);

    this.loadableScreen = Loadable({
      loader: props.loader,
      // page loading with current screen - show loading screen until ready
      loading: isMatch ? LoadingScreen : () => null,
    });

    this.state = {
      // no animation if it's a page load, otherwise - show enter animation
      appear: !isMatch,
      // show loading until file loaded on page load
      ready: isMatch,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.ready && Boolean(nextProps.match)) {
      this.setState({
        ready: true,
      });
    }
  }

  render() {
    const { appear, ready } = this.state;

    return ready ? createElement(this.loadableScreen, { appear, ...this.props }) : null;
  }
}

ScreenLoader.propTypes = {
  loader: PropTypes.func.isRequired,
  match: PropTypes.object,
};

ScreenLoader.defaultProps = {
  match: null,
};

export default ScreenLoader;
