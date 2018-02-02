import connect from 'react-redux/es/connect/connect';
import matchPath from 'react-router-dom/matchPath';
import withRouter from 'react-router-dom/withRouter';
import { goBack, push } from 'connected-react-router/lib/actions';
import compose from 'recompose/compose';
import { addMonster } from 'munchkin-core/es/actions';
import createMonster from 'munchkin-core/es/utils/createMonster';

import HelperButton from './Component';

const mapStateToProps = (state, ownProps) => ({
  expanded: Boolean(
    matchPath(ownProps.location.pathname, { path: '/player/:id/combat/add' }),
  ),
  helper: !state.combat.helperId && state.playerList.length > 1,
  playerId: state.combat.playerId,
});

const mapDispatchToProps = {
  onAdd: (playerId) => push(`/player/${playerId}/combat/add`),
  onBackdropClick: goBack,
  onMonsterAdd: (back) => (dispatch) => {
    dispatch(addMonster(createMonster()));

    if (back) {
      dispatch(goBack());
    }
  },
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(HelperButton);
