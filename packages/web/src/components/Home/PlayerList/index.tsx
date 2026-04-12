import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  hasSortableData,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List, type ListProps } from "@mui/material";

import { movePlayer } from "../../../ducks/playerList";
import useEditMode from "../../../hooks/useEditMode";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";

import Item from "./Item";
import { PlayerListDragOverlay } from "./PlayerListDragOverlay";

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

  const playerList = usePresentSelector((state) => state.playerList);

  const { editMode } = useEditMode();

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
      sensors={useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      )}
    >
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
      <PlayerListDragOverlay />
    </DndContext>
  );
};

export default HomePlayerList;
