import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List } from "@material-ui/core";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { movePlayer } from "../../../ducks/playerList";
import usePresentSelector from "../../../utils/usePresentSelector";

import Item from "./Item";

const HomePlayerList = (props) => {
  const dispatch = useDispatch();

  const playerList = usePresentSelector((state) => state.playerList);

  const [activeId, setActiveId] = useState(null);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        dispatch(
          movePlayer(playerList.indexOf(active.id), playerList.indexOf(over.id))
        );
      }

      setActiveId(null);
    },
    [dispatch, playerList]
  );

  const sensors = [
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  ];

  const mouseSensor = useSensor(MouseSensor);
  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);

  if (window.cordova?.platformId === "windows") {
    sensors.push(pointerSensor);
  } else {
    sensors.push(mouseSensor, touchSensor);
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={useSensors(...sensors)}
    >
      <SortableContext
        items={playerList}
        strategy={verticalListSortingStrategy}
      >
        <List sx={{ touchAction: activeId ? "none" : undefined }} {...props}>
          {playerList.map((playerId) => (
            <Item key={playerId} id={playerId} playerId={playerId} />
          ))}
          <DragOverlay>
            {activeId ? <Item id="overlay" playerId={activeId} /> : null}
          </DragOverlay>
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default HomePlayerList;
