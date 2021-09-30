import { css } from "@emotion/react";
import { List, useTheme } from "@mui/material";
import { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { movePlayer } from "../../../ducks/playerList";
import useEditMode from "../../../utils/useEditMode";
import usePresentSelector from "../../../utils/usePresentSelector";

import Item from "./Item";

const HomePlayerList = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const playerList = usePresentSelector((state) => state.playerList);

  const handleDragEnd = useCallback(
    ({ destination, source }) => {
      if (destination && destination.index !== source.index) {
        dispatch(movePlayer(source.index, destination.index));
      }
    },
    [dispatch]
  );

  const { editMode } = useEditMode();

  if (editMode) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="player-list">
          {({ droppableProps, innerRef: droppableRef, placeholder }) => (
            <List
              ref={droppableRef}
              disablePadding
              {...props}
              {...droppableProps}
            >
              {playerList.map((playerId, index) => (
                <Draggable key={playerId} draggableId={playerId} index={index}>
                  {(
                    { draggableProps, dragHandleProps, innerRef: draggableRef },
                    { isDragging }
                  ) => {
                    let style = { ...draggableProps.style };

                    if (isDragging) {
                      style.zIndex = 1;
                    }

                    if (style.transform) {
                      const transform = style.transform.replace(
                        /translate\(([0-9.-]+px), ([0-9.-]+px)\)/,
                        "translate(0, $2)"
                      );

                      style.transform = transform;
                      style.WebkitTransform = transform;
                    }

                    return (
                      <Item
                        ref={draggableRef}
                        css={
                          isDragging &&
                          css`
                            background-color: ${theme.palette.background.paper};
                            box-shadow: ${theme.shadows[1]};
                          `
                        }
                        dragHandleProps={dragHandleProps}
                        playerId={playerId}
                        {...draggableProps}
                        style={style}
                      />
                    );
                  }}
                </Draggable>
              ))}
              {placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return (
    <List disablePadding {...props}>
      {playerList.map((playerId) => (
        <Item key={playerId} playerId={playerId} />
      ))}
    </List>
  );
};

export default HomePlayerList;
