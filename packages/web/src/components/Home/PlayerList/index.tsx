import { type DragEndEvent } from "@dnd-kit/core";
import { hasSortableData } from "@dnd-kit/sortable";
import { type ListProps } from "@mui/material";

import { movePlayer } from "../../../ducks/playerList";
import { useAppDispatch } from "../../../store";

import { PlayerListDndContext } from "./PlayerListDndContext";
import { PlayerListDragOverlay } from "./PlayerListDragOverlay";
import { PlayerSortableList } from "./PlayerSortableList";

const HomePlayerList = (props: ListProps) => {
  const dispatch = useAppDispatch();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (
      active.id !== over.id &&
      hasSortableData(active) &&
      hasSortableData(over)
    ) {
      dispatch(
        movePlayer(
          active.data.current.sortable.index,
          over.data.current.sortable.index,
        ),
      );
    }
  };

  return (
    <PlayerListDndContext onDragEnd={onDragEnd}>
      <PlayerSortableList {...props} />
      <PlayerListDragOverlay />
    </PlayerListDndContext>
  );
};

export default HomePlayerList;
