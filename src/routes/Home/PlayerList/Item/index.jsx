import { goBack, push } from 'connected-react-router';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
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
import { debounce } from 'lodash/fp';
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

    const itemRef = useRef();
    const avatarRef = useRef();
    const textRef = useRef();
    const hammerRef = useRef();

    const handleRef = useForkRef(ref, itemRef);

    const editMode = mode === EDIT;
    const multiMode = mode === MULTI;

    const selectedPlayerIds = useSelector(
      (state) => state.app.selectedPlayerIds,
    );
    const selected = multiMode && selectedPlayerIds.includes(playerId);

    const players = useSelector((state) => state.players);
    const player = players[playerId];

    const handleTap = useMemo(
      () =>
        debounce(30, (event) => {
          if (event.srcEvent.defaultPrevented) {
            return;
          }

          if (editMode) {
            dispatch(onPlayerEdit(playerId));
          } else if (multiMode) {
            dispatch(onPlayerToggle(playerId));
          } else if (
            avatarRef.current &&
            avatarRef.current.contains(event.target)
          ) {
            dispatch(onMultiSelectActivate(playerId));
          } else {
            dispatch(onPlayerSelect(playerId));
          }
        }),
      [dispatch, editMode, multiMode, playerId],
    );

    const handlePress = useMemo(
      () =>
        debounce(30, (event) => {
          if (
            !mode &&
            textRef.current &&
            textRef.current.contains(event.target)
          ) {
            if (navigator.vibrate) {
              navigator.vibrate(20);
            }

            dispatch(onMultiSelectActivate(playerId));
          }
        }),
      [dispatch, mode, playerId],
    );

    useEffect(() => {
      const pressTime = 500;

      hammerRef.current = new Hammer(itemRef.current, {
        recognizers: [
          [Hammer.Tap, { time: pressTime - 1 }],
          [Hammer.Press, { time: pressTime }],
        ],
      });

      hammerRef.current.on('tap', handleTap);
      hammerRef.current.on('press', handlePress);

      return () => {
        hammerRef.current.stop();
        hammerRef.current.destroy();

        hammerRef.current = null;
      };
    }, [handlePress, handleTap]);

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

        <PlayerListItemText
          ref={textRef}
          hideStats={editMode}
          player={player}
        />

        {editMode && (
          <ListItemSecondaryAction>
            <IconButton disableRipple edge="end" {...dragHandleProps}>
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
