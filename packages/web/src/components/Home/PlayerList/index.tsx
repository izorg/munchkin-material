import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List, type ListProps } from "@mui/material";
import { useCallback, useState } from "react";

import { movePlayer } from "../../../ducks/playerList";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";

import Item from "./Item";
import OverlayItem from "./OverlayItem";

const dndContextModifiers = [restrictToVerticalAxis];

const HomePlayerList = (props: ListProps) => {
  const dispatch = useAppDispatch();

  const playerList = usePresentSelector((state) => state.playerList);

  const [activeId, setActiveId] = useState<null | string>(null);

  const onDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);

      const { active, over } = event;

      if (!over) {
        return;
      }

      if (active.id !== over.id) {
        const oldIndex = playerList.indexOf(String(active.id));
        const newIndex = playerList.indexOf(String(over.id));

        dispatch(movePlayer(oldIndex, newIndex));
      }
    },
    [dispatch, playerList],
  );

  const onDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={dndContextModifiers}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={sensors}
    >
      <List disablePadding {...props}>
        <SortableContext
          items={playerList}
          strategy={verticalListSortingStrategy}
        >
          {playerList.map((playerId) => (
            <Item
              key={playerId}
              playerId={playerId}
              sx={{
                visibility: playerId === activeId ? "hidden" : undefined,
              }}
            />
          ))}
        </SortableContext>
      </List>
      <DragOverlay zIndex={0}>
        {activeId && <OverlayItem playerId={activeId} />}
      </DragOverlay>
    </DndContext>
  );
};

export default HomePlayerList;
