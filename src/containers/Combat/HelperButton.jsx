import React from 'react';
import { connect } from 'react-redux/es';
import matchPath from 'react-router-dom/es/matchPath';
import Route from 'react-router-dom/es/Route';
import { goBack, push } from 'react-router-redux/es/actions';
import { addMonster } from 'munchkin-core/es/actions';
import Monster from 'munchkin-core/es/classes/Monster';

import Fab from '../../components/fab/Container';
import HelperButton from '../../components/fab/HelperButton';
import Transition from '../../components/fab/Transition';

const mapStateToProps = state => ({
  helper: !state.combat.helperId && state.playerList.length > 1,
  playerId: state.combat.playerId,
});

const mapDispatchToProps = dispatch => ({
  onAdd: playerId => dispatch(push(`/player/${playerId}/combat/add`)),
  onBackdropClick: () => dispatch(goBack()),
  onMonsterAdd: (back) => {
    dispatch(addMonster(new Monster()));

    if (back) {
      dispatch(goBack());
    }
  },
});

const CombatHelperButton = props => (
  <Route path="/player/:id/combat">
    {({ location, match }) => (
      <Transition in={Boolean(match)}>
        <Fab>
          <HelperButton
            expanded={Boolean(matchPath(location.pathname, { path: '/player/:id/combat/add' }))}
            {...props}
          />
        </Fab>
      </Transition>
    )}
  </Route>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(CombatHelperButton);
