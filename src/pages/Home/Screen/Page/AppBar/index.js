import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router/lib/actions';
import { removePlayer } from 'munchkin-core/lib/actions';

import * as modes from '../../../modes';
import { modeSelector } from '../../../selectors';

import Component from './Component';

const mapStateToProps = (state) => ({
  empty: state.playerList.length === 0,
  mode: modeSelector(state),
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
  onToggleEditClick: (mode) =>
    mode === modes.EDIT ? goBack() : push(`/${modes.EDIT}`),
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
