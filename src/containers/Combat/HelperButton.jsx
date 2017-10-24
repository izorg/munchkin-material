import React from 'react';
import { connect } from 'react-redux';
import { Route, matchPath } from 'react-router-dom';
import { goBack, push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { addMonster } from 'munchkin-core/lib/actions';
import Monster from 'munchkin-core/lib/classes/Monster';

import HelperButton from '../../components/Fab/HelperButton';
import Transition from '../../components/Fab/Transition';

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

const CombatHelperButton = ({
  helper, onAdd, onBackdropClick, onMonsterAdd, playerId,
}) => (
  <Route path="/player/:id/combat">
    {({ location, match }) => (
      <Transition in={Boolean(match)}>
        <HelperButton
          expanded={Boolean(matchPath(location.pathname, { path: '/player/:id/combat/add' }))}
          helper={helper}
          onAdd={onAdd}
          onBackdropClick={onBackdropClick}
          onMonsterAdd={onMonsterAdd}
          playerId={playerId}
        />
      </Transition>
    )}
  </Route>
);

CombatHelperButton.propTypes = {
  helper: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
  onMonsterAdd: PropTypes.func.isRequired,
  playerId: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(CombatHelperButton);
