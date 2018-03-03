import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { goToCombat } from '../../../../actions';

import Component from './Component';

const mapDispatchToProps = {
  goToCombat,
};

const contextTypes = {
  playerId: PropTypes.string,
};

export default compose(
  getContext(contextTypes),
  connect(undefined, mapDispatchToProps),
)(Component);
