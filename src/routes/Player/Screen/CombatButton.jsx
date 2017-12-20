import React from 'react';
import connectAdvanced from 'react-redux/es/components/connectAdvanced';
import Route from 'react-router-dom/es/Route';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { goToCombat } from '../../../actions';

import Combat from '../../../components/fab/Combat';
import Transition from '../../../components/fab/Transition';

const selectorFactory = dispatch => (state, ownProps) => ({
  ...ownProps,
  fullVersion: state.app.fullVersion,
  onClick: () => {
    if (state.app.fullVersion) {
      dispatch(goToCombat(state.app.activePlayerId));
    } else {
      ownProps.buyFullVersion();
    }
  },
});

const CombatButton = ({ appear, ...props }) => (
  <Route exact path="/player/:id">
    {({ match }) => (
      <Transition appear={appear} in={Boolean(match)}>
        <Combat {...props} />
      </Transition>
    )}
  </Route>
);

CombatButton.propTypes = {
  appear: PropTypes.bool.isRequired,
};

const contextTypes = {
  buyFullVersion: PropTypes.func,
};

export default compose(
  getContext(contextTypes),
  connectAdvanced(selectorFactory),
)(CombatButton);
