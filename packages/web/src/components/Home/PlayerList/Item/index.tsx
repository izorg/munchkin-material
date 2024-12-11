import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  type ListItemProps,
} from "@mui/material";
import { m, type TapHandlers } from "motion/react";
import { useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { togglePlayer, unselectAllPlayers } from "../../../../ducks/ui";
import useEditMode from "../../../../hooks/useEditMode";
import useMultiMode from "../../../../hooks/useMultiMode";
import usePresentSelector from "../../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../../store";
import { useGoBack } from "../../../../utils/location";
import { ios } from "../../../../utils/platforms";
import PlayerAvatar from "../../../PlayerAvatar";
import PlayerListItemText from "../../../PlayerListItemText";

import DragIconButton from "./DragIconButton";

type HomePlayerListItemProps = {
  playerId: string;
} & ListItemProps;

const HomePlayerListItem = (props: HomePlayerListItemProps) => {
  const { playerId, sx = [], ...rest } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const avatarRef = useRef<HTMLDivElement>(null);

  const pressTimeoutRef = useRef(0);

  const goBack = useGoBack();
  const { editMode } = useEditMode();
  const { multiMode, setMultiMode } = useMultiMode();

  const selectedPlayerIds = usePresentSelector(
    (state) => state.ui.selectedPlayerIds,
  );
  const selected = multiMode && selectedPlayerIds.includes(playerId);

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  const onMultiSelectActivate = useCallback(() => {
    dispatch(unselectAllPlayers());
    dispatch(togglePlayer(playerId));

    setMultiMode(true);
  }, [dispatch, playerId, setMultiMode]);

  const onClick = useCallback(
    async (event: Parameters<Required<TapHandlers>["onTap"]>[0]) => {
      if (editMode) {
        setSearchParams((searchParams) => {
          searchParams.set("player", playerId);

          return searchParams;
        });
      } else if (multiMode) {
        dispatch(togglePlayer(playerId));

        if (
          selectedPlayerIds.length === 1 &&
          selectedPlayerIds[0] === playerId
        ) {
          await goBack();
        }
      } else if (avatarRef.current?.contains(event.target as HTMLElement)) {
        onMultiSelectActivate();
      } else {
        await navigate(`/player/${playerId}`);
      }
    },
    [
      dispatch,
      editMode,
      goBack,
      multiMode,
      navigate,
      onMultiSelectActivate,
      playerId,
      selectedPlayerIds,
      setSearchParams,
    ],
  );

  const clearPress = useCallback(() => {
    if (pressTimeoutRef.current) {
      clearTimeout(pressTimeoutRef.current);

      pressTimeoutRef.current = 0;
    }
  }, []);

  const startPointRef = useRef({ x: 0, y: 0 });
  const startTapTimeRef = useRef(Date.now());

  const onTapStart: Required<TapHandlers>["onTapStart"] = useCallback(
    (event, info) => {
      startPointRef.current = info.point;
      startTapTimeRef.current = Date.now();

      pressTimeoutRef.current = window.setTimeout(() => {
        pressTimeoutRef.current = 0;

        const avatarNode = avatarRef.current;

        if (
          !(editMode || multiMode) &&
          !avatarNode?.contains(event.target as HTMLElement)
        ) {
          if (navigator.vibrate && !ios) {
            navigator.vibrate(20);
          }

          onMultiSelectActivate();
        }
      }, 500);
    },
    [editMode, multiMode, onMultiSelectActivate],
  );

  const onTap: Required<TapHandlers>["onTap"] = useCallback(
    async (event) => {
      clearPress();

      if (Date.now() - startTapTimeRef.current < 500) {
        await onClick(event);
      }
    },
    [clearPress, onClick],
  );

  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: playerId,
  });

  const secondaryAction = editMode && (
    <DragIconButton
      component="span"
      edge="end"
      ref={setActivatorNodeRef}
      sx={{
        touchAction: "none",
      }}
      {...attributes}
      {...listeners}
    />
  );

  return (
    <ListItem
      {...rest}
      data-screenshots="player-list-item"
      disablePadding
      ref={setNodeRef}
      secondaryAction={secondaryAction}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      sx={[
        {
          outline: "none",
        },
        editMode &&
          ((theme) => ({
            "& > .MuiListItemButton-root":
              theme.direction === "rtl"
                ? {
                    paddingLeft:
                      "calc(48px + var(--inset-left)) /*! @noflip */",
                  }
                : {
                    paddingRight:
                      "calc(48px + var(--inset-right)) /*! @noflip */",
                  },

            "& > .MuiListItemSecondaryAction-root":
              theme.direction === "rtl"
                ? {
                    left: "calc(16px + var(--inset-left)) /*! @noflip */",
                  }
                : {
                    right: "calc(16px + var(--inset-right)) /*! @noflip */",
                  },
          })),
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      <ListItemButton
        component={m.div}
        onPanStart={clearPress}
        onTap={onTap}
        onTapCancel={clearPress}
        onTapStart={onTapStart}
        role={undefined}
        sx={(theme) => ({
          paddingLeft: `calc(${theme.spacing(2)} + var(--inset-left)) /*! @noflip */`,
          paddingRight: `calc(${theme.spacing(2)} + var(--inset-right)) /*! @noflip */`,
        })}
      >
        <ListItemAvatar>
          <PlayerAvatar
            color={player.color}
            name={player.name}
            ref={avatarRef}
            selected={multiMode && selected}
          />
        </ListItemAvatar>

        <PlayerListItemText player={player} />
      </ListItemButton>
    </ListItem>
  );
};

export default HomePlayerListItem;
