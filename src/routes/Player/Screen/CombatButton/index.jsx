import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { goToCombat } from '../../../../actions';
import { noop } from '../../../../constants';

import Combat from '../../../../components/fab/Combat';
import Transition from '../../../../components/fab/Transition';

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

const CombatButton = ({ appear, onClick }) => (
  <Route exact path="/player/:id">
    {({ match }) => (
      <Transition appear={appear} in={Boolean(match)}>
        <Combat onClick={onClick} />
      </Transition>
    )}
  </Route>
);

CombatButton.propTypes = {
  appear: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

CombatButton.defaultProps = {
  onClick: noop,
};

const contextTypes = {
  buyFullVersion: PropTypes.func,
};

export default compose(
  getContext(contextTypes),
  connect(mapStateToProps, mapDispatchToProps),
)(CombatButton);
