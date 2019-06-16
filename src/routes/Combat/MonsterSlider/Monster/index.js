import { connect } from 'react-redux';
import { compose, shouldUpdate } from 'recompose';

import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from '../../../../ducks/monsters';

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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  shouldUpdate((props, nextProps) => Boolean(nextProps.level !== undefined)),
)(Monster);
