import { goBack } from 'connected-react-router/lib/actions';
import connect from 'react-redux/es/connect/connect';

import { throwDice } from '../actions';

import DiceDialog from '../components/dice/Dialog';

const mapStateToProps = state => ({
  dice: state.app.dice,
  open: state.router.location.search === '?dice',
});

const mapDispatchToProps = {
  onDiceClick: throwDice,
  onClose: goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiceDialog);
