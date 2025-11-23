import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  type ListItemProps,
} from "@mui/material";
import { useLongPress, usePress } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useNavigate, useSearchParams } from "react-router";

import { togglePlayer } from "../../../../ducks/ui";
import useEditMode from "../../../../hooks/useEditMode";
import useMultiMode from "../../../../hooks/useMultiMode";
import usePresentSelector from "../../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../../store";
import { useGoBack } from "../../../../utils/location";
import { ios } from "../../../../utils/platforms";
import PlayerListItemText from "../../../PlayerListItemText";
import { PlayerListAvatar } from "../PlayerListAvatar";
import { useActivateMultiSelect } from "../useActivateMultiSelect";

import { DragIconButton } from "./DragIconButton";

type HomePlayerListItemProps = {
  playerId: string;
} & ListItemProps;

const HomePlayerListItem = (props: HomePlayerListItemProps) => {
  const { playerId, sx = [], ...rest } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const goBack = useGoBack();
  const { editMode } = useEditMode();
  const { multiMode } = useMultiMode();

  const selectedPlayerIds = usePresentSelector(
    (state) => state.ui.selectedPlayerIds,
  );
  const selected = multiMode && selectedPlayerIds.includes(playerId);

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  const activateMultiSelect = useActivateMultiSelect();

  const { pressProps } = usePress({
    onPress: () => {
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
          void goBack();
        }
      } else {
        void navigate(`/player/${playerId}`);
      }
    },
  });

  const { longPressProps } = useLongPress({
    isDisabled: editMode || multiMode,
    onLongPress: () => {
      if (navigator.vibrate && !ios) {
        navigator.vibrate(20);
      }

      activateMultiSelect(playerId);
    },
  });

  const {
    active,
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: playerId,
  });

  return (
    <ListItem
      {...rest}
      data-screenshots="player-list-item"
      disablePadding
      ref={setNodeRef}
      secondaryAction={
        editMode && (
          <DragIconButton
            edge="end"
            ref={setActivatorNodeRef}
            sx={{
              touchAction: "none",
            }}
            {...attributes}
            {...listeners}
          />
        )
      }
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
        active?.id === player.id && {
          visibility: "hidden",
        },
        ...[sx].flat(),
      ]}
    >
      <ListItemButton
        {...mergeProps(pressProps, longPressProps)}
        sx={{
          paddingLeft: `calc(16px + var(--inset-left)) /*! @noflip */`,
          paddingRight: `calc(16px + var(--inset-right)) /*! @noflip */`,
        }}
      >
        <ListItemAvatar>
          <PlayerListAvatar player={player} selected={multiMode && selected} />
        </ListItemAvatar>

        <PlayerListItemText player={player} />
      </ListItemButton>
    </ListItem>
  );
};

export default HomePlayerListItem;
