import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  useForkRef,
} from '@material-ui/core';
import { DragHorizontalVariant as DragIcon } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrag } from 'react-use-gesture';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { togglePlayer, unselectAllPlayers } from '../../../../ducks/app';
import { stringifyQuery, useLocationQuery } from '../../../../utils/location';
import { ios } from '../../../../utils/platforms';
import { EDIT, MULTI } from '../../modes';

const displayName = 'HomePlayerListItem';

const HomePlayerListItem = forwardRef(
  ({ dragHandleProps, playerId, ...rest }, ref) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const itemRef = useRef(null);
    const avatarRef = useRef(null);
    const reorderRef = useRef(null);
    const pressTimeoutRef = useRef(0);

    const handleRef = useForkRef(itemRef, ref);

    const query = useLocationQuery();
    const editMode = query[EDIT] !== undefined;
    const multiMode = query[MULTI] !== undefined;

    const selectedPlayerIds = useSelector(
      (state) => state.app.selectedPlayerIds,
    );
    const selected = multiMode && selectedPlayerIds.includes(playerId);

    const players = useSelector((state) => state.players);
    const player = players[playerId];

    const onMultiSelectActivate = () => {
      dispatch(unselectAllPlayers());
      dispatch(togglePlayer(playerId));

      history.push({
        search: stringifyQuery({
          [MULTI]: null,
        }),
      });
    };

    const onClick = (event) => {
      if (
        editMode &&
        reorderRef.current &&
        reorderRef.current.contains(event.target)
      ) {
        return;
      }

      if (editMode) {
        history.push({
          search: stringifyQuery({
            ...query,
            player: playerId,
          }),
        });
      } else if (multiMode) {
        dispatch(togglePlayer(playerId));

        if (
          selectedPlayerIds.length === 1 &&
          selectedPlayerIds[0] === playerId
        ) {
          history.goBack();
        }
      } else if (
        avatarRef.current &&
        avatarRef.current.contains(event.target)
      ) {
        onMultiSelectActivate();
      } else {
        history.push(`/player/${playerId}`);
      }
    };

    const clearPress = useCallback(() => {
      if (pressTimeoutRef.current) {
        clearTimeout(pressTimeoutRef.current);

        pressTimeoutRef.current = 0;
      }
    }, []);

    const bind = useDrag(
      (state) => {
        const { distance, elapsedTime, event, first, tap } = state;

        const { target } = event;

        if (first) {
          pressTimeoutRef.current = setTimeout(() => {
            pressTimeoutRef.current = 0;

            const avatarNode = avatarRef.current;

            if (
              !(editMode || multiMode) &&
              (!avatarNode || !avatarNode.contains(target))
            ) {
              if (navigator.vibrate) {
                navigator.vibrate(20);
              }

              onMultiSelectActivate();
            }
          }, 500);
        }

        if (!first && distance >= 3) {
          clearPress();
        }

        if (tap) {
          if (elapsedTime < 500) {
            clearPress();

            onClick(event);
          } else if (ios) {
            // Fix hold action on old Safari (<= 12) versions
            event.preventDefault();
          }
        }
      },
      {
        domTarget: itemRef,
        eventOptions: {
          passive: false,
        },
      },
    );

    useEffect(() => {
      bind();
    }, [bind]);

    const onKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClick(event);
      }
    };

    return (
      <ListItem
        ref={handleRef}
        button
        component={editMode ? 'div' : 'li'}
        data-screenshots="player-list-item"
        {...rest}
        onKeyDown={onKeyDown}
      >
        <ListItemAvatar>
          <PlayerAvatar
            ref={avatarRef}
            color={player.color}
            name={player.name}
            selected={multiMode && selected}
          />
        </ListItemAvatar>

        <PlayerListItemText player={player} />

        {editMode && (
          <ListItemSecondaryAction>
            <IconButton
              ref={reorderRef}
              disableRipple
              edge="end"
              {...dragHandleProps}
            >
              <DragIcon />
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
