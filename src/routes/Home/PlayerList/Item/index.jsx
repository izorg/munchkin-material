import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  makeStyles,
  useForkRef,
} from '@material-ui/core';
import { motion } from 'framer-motion';
import { DragHorizontalVariant as DragIcon } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { togglePlayer, unselectAllPlayers } from '../../../../ducks/ui';
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from '../../../../utils/location';
import { EDIT, MULTI } from '../../modes';

const displayName = 'HomePlayerListItem';

const useStyles = makeStyles(
  () => ({
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

    /**
     * @type {React.MutableRefObject<HTMLDivElement|undefined>}
     */
    const avatarRef = useRef();

    /**
     * @type {React.MutableRefObject<HTMLButtonElement|undefined>}
     */
    const reorderRef = useRef();

    const pressTimeoutRef = useRef(0);

    const handleRef = useForkRef(itemRef, ref);

    const goBack = useGoBack();
    const query = useLocationQuery();
    const editMode = query[EDIT] !== undefined;
    const multiMode = query[MULTI] !== undefined;

    const selectedPlayerIds = useSelector(
      (state) => state.present.ui.selectedPlayerIds,
    );
    const selected = multiMode && selectedPlayerIds.includes(playerId);

    const players = useSelector((state) => state.present.players);
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

    const startTapTimeRef = useRef(new Date());

    const onTapStart = (event) => {
      startTapTimeRef.current = new Date();

      pressTimeoutRef.current = setTimeout(() => {
        pressTimeoutRef.current = 0;

        const avatarNode = avatarRef.current;

        if (
          !(editMode || multiMode) &&
          (!avatarNode || !avatarNode.contains(event.target))
        ) {
          if (navigator.vibrate) {
            navigator.vibrate(20);
          }

          onMultiSelectActivate();
        }
      }, 500);
    };

    const onTap = (event) => {
      if (new Date() - startTapTimeRef.current < 500) {
        onClick(event);
      }

      clearPress();
    };

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
          gutters: classes.gutters,
          secondaryAction: classes.secondaryAction,
        }}
        component={editMode ? motion.div : motion.li}
        data-screenshots="player-list-item"
        {...rest}
        onKeyDown={onKeyDown}
        onPanStart={clearPress}
        onTap={onTap}
        onTapCancel={clearPress}
        onTapStart={onTapStart}
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
