import {
  closestCenter,
  DndContext,
  type DndContextProps,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/**
 * `DndContext` with predefined settings for a sortable list
 */
export const PlayerListDndContext = (props: DndContextProps) => (
  <DndContext
    collisionDetection={closestCenter}
    modifiers={[restrictToVerticalAxis]}
    sensors={useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    )}
    {...props}
  />
);
