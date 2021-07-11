import {
  closestCenter,
  DndContext,
  DragOverlay,
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
import { List, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { movePlayer } from "../../../ducks/playerList";
import usePresentSelector from "../../../utils/usePresentSelector";

import Item from "./Item";
import OverlayItem from "./OverlayItem";

const HomePlayerList = (props) => {
  const dispatch = useDispatch();

  const playerList = usePresentSelector((state) => state.playerList);

  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = useCallback(
    (event) => {
      setActiveId(null);

      const { active, over } = event;

      if (active.id !== over.id) {
        const oldIndex = playerList.indexOf(active.id);
        const newIndex = playerList.indexOf(over.id);

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
