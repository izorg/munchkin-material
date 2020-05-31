import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import { Component } from 'react';

const displayName = 'AppContainer';

class AppContainer extends Component {
  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

AppContainer.displayName = displayName;

export default AppContainer;
