import React from 'react';
import { connect } from 'react-redux/es';
import { Route } from 'react-router-dom/es';
import { goBack } from 'react-router-redux/es';
import PropTypes from 'prop-types';

import {
  disableDiceButtonTooltipTriggerFocus,
  enableDiceButtonTooltipTriggerFocus,
  throwDice,
} from '../actions';

import DiceDialog from '../components/dice/Dialog';

const mapStateToProps = state => ({
  dice: state.app.dice,
});

const mapDispatchToProps = {
  onEntered: disableDiceButtonTooltipTriggerFocus,
  onExited: enableDiceButtonTooltipTriggerFocus,
  onDiceClick: throwDice,
  onRequestClose: goBack,
};

const ConnectedDiceDialog = connect(mapStateToProps, mapDispatchToProps)(DiceDialog);

const DiceDialogRoute = ({ path }) => (
  <Route path={`${path}/dice`}>
    {({ match }) => <ConnectedDiceDialog open={Boolean(match)} />}
  </Route>
);

DiceDialogRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default DiceDialogRoute;
