import connect from 'react-redux/es/connect/connect';
import {
  addMonster, removeMonster, setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/es/actions/index';
import createMonster from 'munchkin-core/es/utils/createMonster';

import { removeHelper } from '../../../../actions';

import Component from './Component';

const mapStateToProps = ({
  app, combat, monsters, players,
}) => ({
  helper: players[combat.helperId],
  helperBonus: combat.helperBonus,
  monsters: Object.values(monsters),
  player: players[app.activePlayerId],
  playerBonus: combat.playerBonus,
});

const mapDispatchToProps = dispatch => ({
  onHelperBonusChange: bonus => dispatch(setCombatHelperBonus(bonus)),
  onHelperRemove: () => dispatch(removeHelper()),
  onMonsterAdd: () => addMonster(createMonster()),
  onMonsterRemove: id => dispatch(removeMonster(id)),
  onPlayerBonusChange: bonus => dispatch(setCombatPlayerBonus(bonus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
