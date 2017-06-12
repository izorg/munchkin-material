import { connect } from 'react-redux';

import actions from '../actions';
import DiceDialog from '../components/DiceDialog';

const mapStateToProps = state => ({
  dice: state.app.dice,
});

const mapDispatchToProps = {
  onDiceTouchTap: actions.throwDice,
  onRequestClose: actions.resetDice,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiceDialog);
