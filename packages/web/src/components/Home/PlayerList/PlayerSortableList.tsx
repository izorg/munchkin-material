import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List, type ListProps } from "@mui/material";

import useEditMode from "../../../hooks/useEditMode";
import usePresentSelector from "../../../hooks/usePresentSelector";

import Item from "./Item";

export const PlayerSortableList = (props: ListProps) => {
  const playerList = usePresentSelector((state) => state.playerList);

  const { editMode } = useEditMode();

  return (
    <List disablePadding {...props}>
      <SortableContext
        disabled={!editMode}
        items={playerList}
        strategy={verticalListSortingStrategy}
      >
        {playerList.map((playerId) => (
          <Item key={playerId} playerId={playerId} />
        ))}
      </SortableContext>
    </List>
  );
};
