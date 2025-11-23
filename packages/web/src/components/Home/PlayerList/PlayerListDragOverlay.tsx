import { DragOverlay, useDndContext } from "@dnd-kit/core";

import OverlayItem from "./OverlayItem";

export const PlayerListDragOverlay = () => {
  const { active } = useDndContext();

  return (
    <DragOverlay zIndex={0}>
      {active && <OverlayItem playerId={String(active.id)} />}
    </DragOverlay>
  );
};
