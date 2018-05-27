import { connect } from 'react-redux';
import matchPath from 'react-router-dom/matchPath';
import { goBack } from 'connected-react-router/lib/actions';
import { createSelector, createStructuredSelector } from 'reselect';
import { setCombatHelper } from 'munchkin-core/lib/ducks/combat';

import Component from './Component';

const open = createSelector(
  (state) => state.router.location.pathname,
  (pathname) =>
    Boolean(
      matchPath(pathname, {
        exact: true,
        path: '/player/:id/combat/add/helper',
      }),
    ),
);

const mapStateToProps = createStructuredSelector({
  helpers: (state) =>
    state.playerList
      .filter((id) => id !== state.combat.playerId)
      .map((id) => state.players[id]),
  open,
});

const mapDispatchToProps = {
  onClose: goBack,
  onSelect: (id) => (dispatch) => {
    dispatch(setCombatHelper(id));
    dispatch(goBack());
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
