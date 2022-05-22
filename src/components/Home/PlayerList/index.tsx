import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { css } from "@emotion/react";
import { List, type ListProps, Paper } from "@mui/material";
import { useCallback, useState } from "react";

import { movePlayer } from "../../../ducks/playerList";
import { useAppDispatch } from "../../../store";
import usePresentSelector from "../../../utils/usePresentSelector";

import Item from "./Item";
import OverlayItem from "./OverlayItem";

const HomePlayerList = (props: ListProps) => {
  const dispatch = useAppDispatch();

  const playerList = usePresentSelector((state) => state.playerList);

  const [activeId, setActiveId] = useState<null | string>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = useCallback(
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
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
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
              css={
                playerId === activeId &&
                css`
                  visibility: hidden;
                `
              }
              playerId={playerId}
            />
          ))}
        </SortableContext>
      </List>
      <DragOverlay>
        {activeId && (
          <Paper elevation={1} square>
            <OverlayItem playerId={activeId} />
          </Paper>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default HomePlayerList;
