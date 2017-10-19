import { connect } from 'react-redux';

import { resetDice, throwDice } from '../actions';
import DiceDialog from '../components/dice/Dialog';

const mapStateToProps = state => ({
  dice: state.app.dice,
});

const mapDispatchToProps = {
  onDiceClick: throwDice,
  onRequestClose: resetDice,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiceDialog);
