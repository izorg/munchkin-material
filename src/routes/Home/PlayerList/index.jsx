import { css } from "@emotion/react";
import { List, Paper } from "@material-ui/core";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { movePlayer } from "../../../ducks/playerList";
import { useLocationQuery } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";
import { EDIT } from "../modes";

import Item from "./Item";

const HomePlayerList = (props) => {
  const dispatch = useDispatch();

  const query = useLocationQuery();
  const playerList = usePresentSelector((state) => state.playerList);

  const handleDragEnd = useCallback(
    ({ destination, source }) => {
      if (destination && destination.index !== source.index) {
        dispatch(movePlayer(source.index, destination.index));
      }
    },
    [dispatch]
  );

  if (query[EDIT] !== undefined) {
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
                      style = {
                        ...style,
                        pointerEvents: "auto",
                        transition: undefined,
                        zIndex: 1,
                      };
                    }

                    if (style.transform) {
                      const transform = style.transform.replace(
                        /translate\(([0-9.-]+px), ([0-9.-]+px)\)/,
                        "translate(0, $2)"
                      );

                      style = {
                        ...style,
                        transform,
                        WebkitTransform: transform,
                      };
                    }

                    return (
                      <Item
                        ref={draggableRef}
                        ContainerComponent={Paper}
                        ContainerProps={{
                          ...draggableProps,
                          component: motion.li,
                          elevation: isDragging ? 1 : 0,
                          square: true,
                          style,
                        }}
                        css={
                          isDragging &&
                          css`
                            &:hover {
                              background-color: transparent;
                            }
                          `
                        }
                        dragHandleProps={dragHandleProps}
                        playerId={playerId}
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
