import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { goToCombat } from '../../../../actions';

import Component from './Component';

const mapStateToProps = state => ({
  fullVersion: state.app.fullVersion,
});

const mapDispatchToProps = {
  goToCombat,
};

const contextTypes = {
  buyFullVersion: PropTypes.func,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  getContext(contextTypes),
)(Component);
