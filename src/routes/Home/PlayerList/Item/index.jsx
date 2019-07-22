import { goBack, push } from 'connected-react-router';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { useForkRef } from '@material-ui/core/utils';
import { ReorderHorizontal } from 'mdi-material-ui';
import Hammer from 'hammerjs';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { togglePlayer, unselectAllPlayers } from '../../../../ducks/app';

import { EDIT, MULTI } from '../../modes';
import modeType from '../../modeType';

const onMultiSelectActivate = (playerId) => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(push(`/${MULTI}`));
};

const onPlayerEdit = (playerId) => push(`?player=${playerId}`);

const onPlayerSelect = (playerId) => push(`/player/${playerId}`);

const onPlayerToggle = (playerId) => (dispatch, getState) => {
  dispatch(togglePlayer(playerId));

  const {
    app: { selectedPlayerIds },
  } = getState();

  if (selectedPlayerIds.length === 0) {
    dispatch(goBack());
  }
};

const HomePlayerListItem = forwardRef(
  ({ dragHandleProps, mode, playerId, ...rest }, ref) => {
    const dispatch = useDispatch();

    const itemRef = useRef(null);
    const avatarRef = useRef(null);
    const reorderRef = useRef(null);
    const hammerRef = useRef(null);
    const ignoringPressUp = useRef(false);

    const handleRef = useForkRef(ref, itemRef);

    const editMode = mode === EDIT;
    const multiMode = mode === MULTI;

    const selectedPlayerIds = useSelector(
      (state) => state.app.selectedPlayerIds,
    );
    const selected = multiMode && selectedPlayerIds.includes(playerId);

    const players = useSelector((state) => state.players);
    const player = players[playerId];

    const handleTap = useCallback(
      (event) => {
        if (editMode) {
          if (reorderRef.current && reorderRef.current.contains(event.target)) {
            return;
          }

          setTimeout(() => dispatch(onPlayerEdit(playerId)), 300);
        } else if (multiMode) {
          dispatch(onPlayerToggle(playerId));
        } else if (
          avatarRef.current &&
          avatarRef.current.contains(event.target)
        ) {
          dispatch(onMultiSelectActivate(playerId));
        } else {
          setTimeout(() => dispatch(onPlayerSelect(playerId)), 300);
        }
      },
      [dispatch, editMode, multiMode, playerId],
    );

    const handlePress = useCallback(
      (event) => {
        ignoringPressUp.current = false;

        if (
          !mode &&
          (!avatarRef.current || !avatarRef.current.contains(event.target)) &&
          (!reorderRef.current || !reorderRef.current.contains(event.target))
        ) {
          if (navigator.vibrate) {
            navigator.vibrate(20);
          }

          dispatch(onMultiSelectActivate(playerId));

          ignoringPressUp.current = true;
        }
      },
      [dispatch, mode, playerId],
    );

    const handlePressUp = useCallback(
      (event) => {
        if (ignoringPressUp.current) {
          return;
        }

        handleTap(event);
      },
      [handleTap],
    );

    useEffect(() => {
      const pressTime = 500;

      hammerRef.current = new Hammer(itemRef.current, {
        recognizers: [
          [Hammer.Tap, { time: pressTime - 1 }],
          [Hammer.Press, { time: pressTime }],
        ],
      });

      return () => {
        hammerRef.current.stop();
        hammerRef.current.destroy();

        hammerRef.current = null;
      };
    }, []);

    useEffect(() => {
      hammerRef.current.on('tap', handleTap);

      return () => hammerRef.current && hammerRef.current.off('tap', handleTap);
    }, [handleTap]);

    useEffect(() => {
      hammerRef.current.on('press', handlePress);
      hammerRef.current.on('pressup', handlePressUp);

      return () => {
        if (hammerRef.current) {
          hammerRef.current.off('press', handlePress);
          hammerRef.current.off('pressup', handlePressUp);
        }
      };
    }, [handlePress, handlePressUp]);

    return (
      <ListItem
        ref={handleRef}
        button
        component={editMode ? 'div' : 'li'}
        data-screenshots="player-list-item"
        {...rest}
      >
        <ListItemAvatar>
          <Avatar
            ref={avatarRef}
            color={player.color}
            selected={multiMode && selected}
            sex={player.sex}
          />
        </ListItemAvatar>

        <PlayerListItemText hideStats={editMode} player={player} />

        {editMode && (
          <ListItemSecondaryAction>
            <IconButton
              ref={reorderRef}
              disableRipple
              edge="end"
              {...dragHandleProps}
            >
              <ReorderHorizontal />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  },
);

HomePlayerListItem.propTypes = {
  dragHandleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  mode: modeType,
  playerId: PropTypes.string.isRequired,
};

HomePlayerListItem.defaultProps = {
  dragHandleProps: undefined,
  mode: null,
};

export default HomePlayerListItem;
