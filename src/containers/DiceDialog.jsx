import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';

import {
  disableDiceButtonTooltipTriggerFocus,
  enableDiceButtonTooltipTriggerFocus,
  throwDice,
} from '../actions';
import { locationShape } from '../utils/propTypes';

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

const DiceDialogRoute = ({ location, path }) => (
  <Route location={location} path={`${path}/dice`}>
    {({ match }) => <ConnectedDiceDialog open={Boolean(match)} />}
  </Route>
);

DiceDialogRoute.propTypes = {
  location: locationShape.isRequired, // eslint-disable-line react/no-typos
  path: PropTypes.string.isRequired,
};

// eslint-disable-next-line max-len
const ConnectedDiceDialogRoute = connect(state => ({ location: state.router.location }))(DiceDialogRoute);

ConnectedDiceDialogRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ConnectedDiceDialogRoute;
