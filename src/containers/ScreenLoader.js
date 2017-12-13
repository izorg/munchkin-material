import { createElement, PureComponent } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

import LoadingScreen from '../components/LoadingScreen';

class ScreenLoader extends PureComponent {
  constructor(props) {
    super(props);

    this.loadableScreen = Loadable({
      loader: props.loader,
      // page loading with current screen - show loading screen until ready
      loading: props.in ? LoadingScreen : () => null,
    });

    this.state = {
      // no animation if it's a page load, otherwise - show enter animation
      appear: !props.in,
      // show loading until file loaded on page load
      ready: props.in,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.ready && nextProps.in) {
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
  in: PropTypes.bool.isRequired,
  loader: PropTypes.func.isRequired,
};

export default ScreenLoader;
