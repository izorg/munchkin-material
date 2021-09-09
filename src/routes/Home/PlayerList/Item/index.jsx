import { css } from "@emotion/react";
import { mdiDragHorizontalVariant as dragIcon } from "@mdi/js";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  SvgIcon,
} from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { forwardRef, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import PlayerAvatar from "../../../../components/PlayerAvatar";
import PlayerListItemText from "../../../../components/PlayerListItemText";
import { togglePlayer, unselectAllPlayers } from "../../../../ducks/ui";
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from "../../../../utils/location";
import { ios } from "../../../../utils/platforms";
import usePresentSelector from "../../../../utils/usePresentSelector";
import { EDIT, MULTI } from "../../modes";

const displayName = "HomePlayerListItem";

const HomePlayerListItem = forwardRef(
  ({ dragHandleProps, playerId, ...rest }, ref) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    const avatarRef = useRef(null);

    /**
     * @type {React.RefObject<HTMLButtonElement>}
     */
    const reorderRef = useRef(null);

    const pressTimeoutRef = useRef(0);

    const goBack = useGoBack();
    const query = useLocationQuery();
    const editMode = query[EDIT] !== undefined;
    const multiMode = query[MULTI] !== undefined;

    const selectedPlayerIds = usePresentSelector(
      (state) => state.ui.selectedPlayerIds
    );
    const selected = multiMode && selectedPlayerIds.includes(playerId);

    const players = usePresentSelector((state) => state.players);
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
      if (editMode && reorderRef.current?.contains(event.target)) {
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
      } else if (avatarRef.current?.contains(event.target)) {
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

    const startPointRef = useRef({ x: 0, y: 0 });
    const startTapTimeRef = useRef(Date.now());

    const onTapStart = (event, info) => {
      startPointRef.current = info.point;
      startTapTimeRef.current = Date.now();

      pressTimeoutRef.current = setTimeout(() => {
        pressTimeoutRef.current = 0;

        const avatarNode = avatarRef.current;

        if (
          !(editMode || multiMode) &&
          (!avatarNode || !avatarNode.contains(event.target))
        ) {
          if (navigator.vibrate && !ios) {
            navigator.vibrate(20);
          }

          onMultiSelectActivate();
        }
      }, 500);
    };

    const onTap = (event, info) => {
      clearPress();

      if (event.type === "pointercancel") {
        return;
      }

      const delta = Math.sqrt(
        Math.pow(info.point.x - startPointRef.current.x, 2) +
          Math.pow(info.point.y - startPointRef.current.y, 2)
      );

      // happens when mouse down, move and up on the same item
      if (delta > 3) {
        return;
      }

      if (Date.now() - startTapTimeRef.current < 500) {
        onClick(event);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Enter") {
        onClick(event);
      }
    };

    return (
      <ListItem
        ref={ref}
        button
        component={editMode ? motion.div : motion.li}
        css={[
          css`
            @supports (padding: max(0px)) {
              padding-left: max(16px, env(safe-area-inset-left));
              padding-right: max(16px, env(safe-area-inset-right));
            }
          `,
          editMode &&
            css`
              @supports (padding: max(0px)) {
                padding-right: calc(
                  32px + max(16px, env(safe-area-inset-right))
                );
              }
            `,
        ]}
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
            sx={{
              "@supports (right: max(0px))": {
                right: "max(16px, env(safe-area-inset-right))",
              },
            }}
          >
            <IconButton
              ref={reorderRef}
              component="span"
              disableRipple
              edge="end"
              {...dragHandleProps}
            >
              <SvgIcon>
                <path d={dragIcon} />
              </SvgIcon>
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
);

HomePlayerListItem.propTypes = {
  dragHandleProps: PropTypes.shape({
    onDragStart: PropTypes.func.isRequired,
  }),
  playerId: PropTypes.string.isRequired,
};

HomePlayerListItem.displayName = displayName;

export default HomePlayerListItem;
