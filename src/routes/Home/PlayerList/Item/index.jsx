import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  makeStyles,
  useForkRef,
} from '@material-ui/core';
import { DragHorizontalVariant as DragIcon } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrag } from 'react-use-gesture';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { togglePlayer, unselectAllPlayers } from '../../../../ducks/app';
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from '../../../../utils/location';
import { ios } from '../../../../utils/platforms';
import { EDIT, MULTI } from '../../modes';

const displayName = 'HomePlayerListItem';

const useStyles = makeStyles(
  () => ({
    root: {
      touchAction: 'none',
    },

    gutters: {
      '@supports (padding: max(0px))': {
        paddingLeft: `max(16px, env(safe-area-inset-left))`,
        paddingRight: `max(16px, env(safe-area-inset-right))`,
      },
    },

    secondaryAction: {
      '@supports (padding: max(0px))': {
        paddingRight: `calc(32px + max(16px, env(safe-area-inset-right)))`,
      },
    },

    secondaryActionRoot: {
      '@supports (padding: max(0px))': {
        right: 'max(16px, env(safe-area-inset-right))',
      },
    },
  }),
  { name: displayName },
);

const HomePlayerListItem = forwardRef(
  ({ dragHandleProps, playerId, ...rest }, ref) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const classes = useStyles();

    const itemRef = useRef(null);
    const avatarRef = useRef(null);
    const reorderRef = useRef(null);
    const pressTimeoutRef = useRef(0);

    const handleRef = useForkRef(itemRef, ref);

    const goBack = useGoBack();
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

      navigate({
        ...location,
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
        navigate({
          ...location,
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
          goBack();
        }
      } else if (
        avatarRef.current &&
        avatarRef.current.contains(event.target)
      ) {
        onMultiSelectActivate();
      } else {
        navigate(`/player/${playerId}`);
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

        /*
         * Not possible to use preventDefault to prevent mouse event emulation
         * on touch devices. On cordova pressing hardware back button exits app
         */
        if (tap) {
          // detect emulated mouse event on touch devices (<= 10 for Android 4.4)
          if (elapsedTime <= 10) {
            return;
          }

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
        eventOptions: {
          passive: false,
        },
      },
    );

    const onKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClick(event);
      }
    };

    return (
      <ListItem
        ref={handleRef}
        button
        classes={{
          root: classes.root,
          gutters: classes.gutters,
          secondaryAction: classes.secondaryAction,
        }}
        component={editMode ? 'div' : 'li'}
        data-screenshots="player-list-item"
        touch-action="none"
        {...rest}
        onKeyDown={onKeyDown}
        {...bind()}
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
          <ListItemSecondaryAction
            classes={{
              root: classes.secondaryActionRoot,
            }}
          >
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
  dragHandleProps: PropTypes.shape({
    onDragStart: PropTypes.func.isRequired,
  }),
  playerId: PropTypes.string.isRequired,
};

HomePlayerListItem.displayName = displayName;

export default HomePlayerListItem;
