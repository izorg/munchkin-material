import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideBanner, showBanner } from '../../../actions/index';

export default (WrappedComponent) => {
  class Banner extends Component {
    componentWillMount() {
      this.handleResize = this.handleResize.bind(this);

      window.addEventListener('resize', this.handleResize);

      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);

      this.props.hideBanner();
    }

    handleResize() {
      const { innerHeight, innerWidth } = window;

      if (innerWidth < innerHeight && innerHeight > 460) {
        this.props.showBanner();
      } else {
        this.props.hideBanner();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Banner.propTypes = {
    hideBanner: PropTypes.func.isRequired,
    showBanner: PropTypes.func.isRequired,
  };

  return connect(undefined, { hideBanner, showBanner })(Banner);
};
