import connect from 'react-redux/es/connect/connect';
import withRouter from 'react-router-dom/withRouter';
import { goBack, push } from 'connected-react-router/lib/actions';
import compose from 'recompose/compose';
import { removePlayer } from 'munchkin-core/es/actions';

import * as modes from '../../../modes';
import { getModeFromPathname } from '../../../path';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: state.playerList.length === 0,
  mode: getModeFromPathname(state.router.location.pathname),
  selectedPlayerIds: state.app.selectedPlayerIds,
});

const mapDispatchToProps = {
  onMultiSelectDeactivate: goBack,
  onPlayersDelete: (selectedPlayerIds) => (dispatch) => {
    selectedPlayerIds.forEach((id) => {
      dispatch(removePlayer(id));
    });
    dispatch(goBack());
  },
  onToggleEditClick: (mode) => (dispatch) => {
    if (mode === modes.EDIT) {
      dispatch(goBack());
    } else {
      dispatch(push(`/${modes.EDIT}`));
    }
  },
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
