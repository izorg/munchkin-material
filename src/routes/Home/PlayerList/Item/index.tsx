import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/react";
import { mdiDragHorizontalVariant as dragIcon } from "@mdi/js";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemProps,
  SvgIcon,
} from "@mui/material";
import { motion, TapInfo } from "framer-motion";
import PropTypes from "prop-types";
import { KeyboardEvent, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import PlayerAvatar from "../../../../components/PlayerAvatar";
import PlayerListItemText from "../../../../components/PlayerListItemText";
import { togglePlayer, unselectAllPlayers } from "../../../../ducks/ui";
import { AvailableColor } from "../../../../utils/availableColors";
import { useGoBack } from "../../../../utils/location";
import { ios } from "../../../../utils/platforms";
import useEditMode from "../../../../utils/useEditMode";
import useMultiMode from "../../../../utils/useMultiMode";
import usePresentSelector from "../../../../utils/usePresentSelector";

type HomePlayerListItemProps = ListItemProps & {
  playerId: string;
};

const HomePlayerListItem = (props: HomePlayerListItemProps) => {
  const { playerId, ...rest } = props;

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const avatarRef = useRef<HTMLDivElement>(null);

  const pressTimeoutRef = useRef(0);

  const goBack = useGoBack();
  const { editMode } = useEditMode();
  const { multiMode, setMultiMode } = useMultiMode();

  const selectedPlayerIds = usePresentSelector(
    (state) => state.ui.selectedPlayerIds
  );
  const selected = multiMode && selectedPlayerIds.includes(playerId);

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  const onMultiSelectActivate = () => {
    dispatch(unselectAllPlayers());
    dispatch(togglePlayer(playerId));

    setMultiMode(true);
  };

  const onClick = (
    event: KeyboardEvent | MouseEvent | PointerEvent | TouchEvent
  ) => {
    if (editMode) {
      const searchParams = new URLSearchParams(location.search);

      searchParams.set("player", playerId);

      navigate({
        search: `?${searchParams.toString()}`,
      });
    } else if (multiMode) {
      dispatch(togglePlayer(playerId));

      if (selectedPlayerIds.length === 1 && selectedPlayerIds[0] === playerId) {
        goBack();
      }
    } else if (avatarRef.current?.contains(event.target as HTMLElement)) {
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

  const onTapStart = (
    event: MouseEvent | PointerEvent | TouchEvent,
    info: TapInfo
  ) => {
    startPointRef.current = info.point;
    startTapTimeRef.current = Date.now();

    pressTimeoutRef.current = window.setTimeout(() => {
      pressTimeoutRef.current = 0;

      const avatarNode = avatarRef.current;

      if (
        !(editMode || multiMode) &&
        (!avatarNode || !avatarNode.contains(event.target as HTMLElement))
      ) {
        if (navigator.vibrate && !ios) {
          navigator.vibrate(20);
        }

        onMultiSelectActivate();
      }
    }, 500);
  };

  const onTap = (
    event: MouseEvent | PointerEvent | TouchEvent,
    info: TapInfo
  ) => {
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

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onClick(event);
    }
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      disabled: !editMode,
      id: playerId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      {...rest}
      {...attributes}
      ref={setNodeRef}
      css={
        editMode &&
        css`
          @supports (padding: max(0px)) {
            & > .MuiListItemButton-root {
              padding-right: calc(32px + max(16px, env(safe-area-inset-right)));
            }

            & > .MuiListItemSecondaryAction-root {
              right: max(16px, env(safe-area-inset-right));
            }
          }
        `
      }
      data-screenshots="player-list-item"
      disablePadding
      secondaryAction={
        editMode && (
          <IconButton component="span" disableRipple edge="end" {...listeners}>
            <SvgIcon>
              <path d={dragIcon} />
            </SvgIcon>
          </IconButton>
        )
      }
      style={style}
    >
      <ListItemButton
        component={motion.div}
        css={css`
          @supports (padding: max(0px)) {
            padding-left: max(16px, env(safe-area-inset-left));
            padding-right: max(16px, env(safe-area-inset-right));
          }
        `}
        onKeyDown={onKeyDown}
        onPanStart={clearPress}
        onTap={onTap}
        onTapCancel={clearPress}
        onTapStart={onTapStart}
      >
        <ListItemAvatar>
          <PlayerAvatar
            ref={avatarRef}
            color={player.color as AvailableColor}
            name={player.name}
            selected={multiMode && selected}
          />
        </ListItemAvatar>

        <PlayerListItemText player={player} />
      </ListItemButton>
    </ListItem>
  );
};

HomePlayerListItem.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default HomePlayerListItem;
