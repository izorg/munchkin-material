import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { goToCombat } from '../../../../actions';

import Component from './Component';

const mapStateToProps = state => ({
  fullVersion: state.app.fullVersion,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // eslint-disable-next-line no-shadow
  onClick: () => dispatch((dispatch, getState) => {
    const { app: { activePlayerId, fullVersion } } = getState();

    if (fullVersion) {
      dispatch(goToCombat(activePlayerId));
    } else {
      ownProps.buyFullVersion();
    }
  }),
});

const contextTypes = {
  buyFullVersion: PropTypes.func,
};

export default compose(
  getContext(contextTypes),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
