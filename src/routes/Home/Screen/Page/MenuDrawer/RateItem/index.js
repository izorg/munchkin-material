import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { goBack } from 'connected-react-router';
import PropTypes from 'prop-types';

import Component from './Component';

const mapDispatchToProps = {
  onClick: goBack,
};

const contextTypes = {
  rateLink: PropTypes.string,
};

export default compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  getContext(contextTypes),
)(Component);
