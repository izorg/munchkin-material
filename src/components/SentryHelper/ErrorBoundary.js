import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';
import { Component } from 'react';

const displayName = 'ErrorBoundary';

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    const { store } = this.props;

    Sentry.withScope((scope) => {
      scope.setExtras({
        ...errorInfo,
        state: store.getState(),
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

ErrorBoundary.displayName = displayName;

export default ErrorBoundary;
