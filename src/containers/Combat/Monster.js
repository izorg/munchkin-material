import { connect } from 'react-redux/es';
import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from 'munchkin-core/es/actions';

import Monster from '../../components/Combat/Monster';

const mapDispatchToProps = {
  onBonusDecrement: decrementMonsterBonus,
  onBonusIncrement: incrementMonsterBonus,
  onLevelDecrement: decrementMonsterLevel,
  onLevelIncrement: incrementMonsterLevel,
};

export default connect(undefined, mapDispatchToProps)(Monster);
