import React from 'react';
import { connect } from 'react-redux/es';
import { Route } from 'react-router-dom/es';
import { goBack, push } from 'react-router-redux/es';
import Monster from 'munchkin-core/es/classes/Monster';
import {
  addMonster,
  removeMonster,
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/es/actions';

import { removeHelper, throwDice } from '../../actions';

import ScreenLoader from '../ScreenLoader';

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
  onBack: () => dispatch(goBack()),
  onDiceClick: (player) => {
    dispatch(throwDice());
    dispatch(push(`/player/${player.id}/combat/dice`));
  },
  onHelperBonusChange: bonus => dispatch(setCombatHelperBonus(bonus)),
  onHelperRemove: () => dispatch(removeHelper()),
  onMonsterAdd: () => addMonster(new Monster()),
  onMonsterRemove: id => dispatch(removeMonster(id)),
  onPlayerBonusChange: bonus => dispatch(setCombatPlayerBonus(bonus)),
});

const loader = () => import(/* webpackChunkName: "combat", webpackMode: "lazy" */ './Screen');

const PlayerCombat = props => (
  <Route path="/player/:id/combat">
    {({ match }) => (
      <ScreenLoader
        in={Boolean(match)}
        loader={loader}
        path="/player/:id/combat"
        {...props}
      />
    )}
  </Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCombat);
