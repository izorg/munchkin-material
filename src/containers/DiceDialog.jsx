import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import { goBack } from 'react-router-redux/es/actions';
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
