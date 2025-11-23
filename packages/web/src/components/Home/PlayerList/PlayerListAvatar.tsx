import { usePress } from "@react-aria/interactions";

import { type Player } from "../../../domains/player";
import useEditMode from "../../../hooks/useEditMode";
import useMultiMode from "../../../hooks/useMultiMode";
import PlayerAvatar, { type PlayerAvatarProps } from "../../PlayerAvatar";

import { useActivateMultiSelect } from "./useActivateMultiSelect";

type PlayerListAvatarProps = {
  player: Player;
} & Pick<PlayerAvatarProps, "selected">;

export const PlayerListAvatar = ({
  player,
  selected,
}: PlayerListAvatarProps) => {
  const { editMode } = useEditMode();
  const { multiMode } = useMultiMode();

  const activateMultiSelect = useActivateMultiSelect();

  const { color, id, name } = player;

  const { pressProps } = usePress({
    onPress: (event) => {
      if (!editMode && !multiMode) {
        activateMultiSelect(id);
      } else {
        event.continuePropagation();
      }
    },
    onPressStart: (event) => {
      if (editMode || multiMode) {
        event.continuePropagation();
      }
    },
  });

  return (
    <PlayerAvatar
      {...pressProps}
      color={color}
      name={name}
      selected={selected}
    />
  );
};
