import { connect } from 'react-redux';
import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from 'munchkin-core/lib/actions';

import Monster from './Component';

const mapStateToProps = (state, ownProps) => ({
  ...state.monsters[ownProps.id],
});

const mapDispatchToProps = {
  onBonusDecrement: decrementMonsterBonus,
  onBonusIncrement: incrementMonsterBonus,
  onLevelDecrement: decrementMonsterLevel,
  onLevelIncrement: incrementMonsterLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Monster);
