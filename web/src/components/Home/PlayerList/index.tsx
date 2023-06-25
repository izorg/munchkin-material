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
import { useCallback, useMemo, useState } from "react";

import { movePlayer } from "../../../ducks/playerList";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";

import Item from "./Item";
import OverlayItem from "./OverlayItem";

const HomePlayerList = (props: ListProps) => {
  const dispatch = useAppDispatch();

  const playerList = usePresentSelector((state) => state.playerList);

  const [activeId, setActiveId] = useState<null | string>(null);

  const onDragStart = useCallback((event: DragStartEvent) => {
    if (typeof event.active.id === "string") {
      setActiveId(event.active.id);
    }
  }, []);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);

      const { active, over } = event;

      if (!over) {
        return;
      }

      if (active.id !== over.id) {
        const oldIndex = playerList.indexOf(active.id as string);
        const newIndex = playerList.indexOf(over.id as string);

        dispatch(movePlayer(oldIndex, newIndex));
      }
    },
    [dispatch, playerList]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={useMemo(() => [restrictToVerticalAxis], [])}
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
              sx={[
                playerId === activeId && {
                  visibility: "hidden",
                },
              ]}
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
