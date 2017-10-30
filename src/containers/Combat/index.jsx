import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { goBack } from 'react-router-redux';
import Slide from 'material-ui/transitions/Slide';
import Monster from 'munchkin-core/es/classes/Monster';
import {
  addMonster,
  removeMonster,
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/es/actions';

import { removeHelper, throwDice } from '../../actions';
import HelperButton from './HelperButton';
import Combat from '../../components/Combat';

const mapStateToProps = ({
  app, combat, monsters, players,
}) => ({
  helper: players[combat.helperId],
  helperBonus: combat.helperBonus,
  monsters: Object.values(monsters),
  player: players[app.activePlayerId],
  playerBonus: combat.playerBonus,
});

const mapDispatchToProps = {
  onBack: goBack,
  onDiceClick: throwDice,
  onHelperBonusChange: setCombatHelperBonus,
  onHelperRemove: removeHelper,
  onMonsterAdd: () => addMonster(new Monster()),
  onMonsterRemove: removeMonster,
  onPlayerBonusChange: setCombatPlayerBonus,
};

const PlayerCombat = props => (
  <Route path="/player/:id/combat">
    {({ match }) => [
      <Slide
        appear={false}
        direction="left"
        key="screen"
        in={Boolean(match)}
        mountOnEnter
        unmountOnExit
      >
        <Combat {...props} />
      </Slide>,
      <HelperButton key="fab" />,
    ]}
  </Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCombat);
