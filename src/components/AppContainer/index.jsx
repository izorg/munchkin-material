import PropTypes from 'prop-types';
import { Component } from 'react';

const displayName = 'AppContainer';

class AppContainer extends Component {
  componentDidCatch(error, errorInfo) {
    const { Sentry } = this.props;

    if (Sentry) {
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  Sentry: PropTypes.shape({
    captureException: PropTypes.func.isRequired,
    withScope: PropTypes.func.isRequired,
  }).isRequired,
};

AppContainer.displayName = displayName;

export default AppContainer;
