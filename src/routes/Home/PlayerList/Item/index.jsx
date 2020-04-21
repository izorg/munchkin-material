import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { useForkRef } from '@material-ui/core/utils';
import { goBack, push } from 'connected-react-router';
import Hammer from 'hammerjs';
import { ReorderHorizontal } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { togglePlayer, unselectAllPlayers } from '../../../../ducks/app';
import { getQuery, stringifyQuery } from '../../../../utils/location';
import { EDIT, MULTI } from '../../modes';

const displayName = 'HomePlayerListItem';

const onMultiSelectActivate = (playerId) => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(
    push({
      search: stringifyQuery({
        [MULTI]: null,
      }),
    }),
  );
};

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
  ({ dragHandleProps, playerId, ...rest }, ref) => {
    const dispatch = useDispatch();

    const itemRef = useRef(null);
    const avatarRef = useRef(null);
    const reorderRef = useRef(null);
    const hammerRef = useRef(null);
    const ignoringPressUp = useRef(false);

    const handleRef = useForkRef(ref, itemRef);

    const query = useSelector(getQuery);
    const editMode = query[EDIT] !== undefined;
    const multiMode = query[MULTI] !== undefined;

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

          setTimeout(
            () =>
              dispatch(
                push({
                  search: stringifyQuery({
                    ...query,
                    player: playerId,
                  }),
                }),
              ),
            300,
          );
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
      [dispatch, editMode, multiMode, playerId, query],
    );

    const handlePress = useCallback(
      (event) => {
        ignoringPressUp.current = false;

        const avatarNode = avatarRef.current;

        if (
          !(editMode || multiMode) &&
          (!avatarNode || !avatarNode.contains(event.target))
        ) {
          if (navigator.vibrate) {
            navigator.vibrate(20);
          }

          dispatch(onMultiSelectActivate(playerId));

          ignoringPressUp.current = true;
        }
      },
      [dispatch, editMode, multiMode, playerId],
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
      const hammer = hammerRef.current;

      hammer.on('tap', handleTap);

      return () => hammer && hammer.off('tap', handleTap);
    }, [handleTap]);

    useEffect(() => {
      const hammer = hammerRef.current;

      hammer.on('press', handlePress);
      hammer.on('pressup', handlePressUp);

      return () => {
        if (hammer) {
          hammer.off('press', handlePress);
          hammer.off('pressup', handlePressUp);
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
          <PlayerAvatar
            ref={avatarRef}
            color={player.color}
            name={player.name}
            selected={multiMode && selected}
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
  playerId: PropTypes.string.isRequired,
};

HomePlayerListItem.defaultProps = {
  dragHandleProps: undefined,
};

HomePlayerListItem.displayName = displayName;

export default HomePlayerListItem;
