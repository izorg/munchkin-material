import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get, isEqual } from 'lodash/fp';

import { updatePlayer } from '../../../ducks/players';
import { applyUndo, removeUndo, UNDO_KILL_PLAYER } from '../../../ducks/undo';

import Component from './Component';

const getUndoType = get(['undo', 'type']);
const getPlayer = get(['undo', 'player']);

const message = createSelector(
  getUndoType,
  getPlayer,
  (type, { name, sex } = {}) => {
    switch (type) {
      case UNDO_KILL_PLAYER:
        return (
          <FormattedMessage
            defaultMessage="{name} {sex, select, female {has died} male {has died}}"
            id="undo.killPlayer"
            values={{
              name,
              sex,
            }}
          />
        );

      default:
        return null;
    }
  },
);

const open = flow(
  getUndoType,
  isEqual(UNDO_KILL_PLAYER),
);

const mapStateToProps = createStructuredSelector({
  message,
  open,
});

const mapDispatchToProps = {
  onClose: (event, reason) => (dispatch, getState) => {
    if (reason === 'undo') {
      const player = get(['undo', 'player'], getState());

      dispatch(applyUndo());

      dispatch(updatePlayer(player));
    } else {
      dispatch(removeUndo());
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
