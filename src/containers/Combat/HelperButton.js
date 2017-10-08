import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { goBack, push } from 'react-router-redux';
import { addMonster } from 'munchkin-core/lib/actions';
import Monster from 'munchkin-core/lib/classes/Monster';

import CombatHelperButton from '../../components/Combat/HelperButton';

const mapStateToProps = (state, props) => ({
  expanded: Boolean(matchPath(props.location.pathname, { path: '/player/:id/combat/add' })),
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

export default connect(mapStateToProps, mapDispatchToProps)(CombatHelperButton);
