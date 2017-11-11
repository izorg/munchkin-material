import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import {
  disableDiceButtonTooltipTriggerFocus,
  enableDiceButtonTooltipTriggerFocus,
  resetDice,
  throwDice,
} from '../actions';

const mapStateToProps = state => ({
  dice: state.app.dice,
});

const mapDispatchToProps = {
  onEntered: disableDiceButtonTooltipTriggerFocus,
  onExited: enableDiceButtonTooltipTriggerFocus,
  onDiceClick: throwDice,
  onRequestClose: resetDice,
};

const LoadableDiceDialog = Loadable({
  loader: () => import(/* webpackChunkName: "dice-dialog", webpackMode: "lazy" */ '../components/dice/Dialog'),
  loading: () => null,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadableDiceDialog);
