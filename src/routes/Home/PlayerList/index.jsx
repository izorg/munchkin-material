import { List, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { movePlayer } from '../../../ducks/playerList';
import { EDIT } from '../modes';
import modeType from '../modeType';

import Item from './Item';

const displayName = 'HomePlayerList';

const useStyles = makeStyles(
  {
    dragging: {
      '& [data-react-beautiful-dnd-draggable="0"]': {
        transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
      },
    },

    drag: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  { name: displayName },
);

const HomePlayerList = ({ mode, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const playerList = useSelector((state) => state.playerList);

  const handleDragEnd = useCallback(
    ({ destination, source }) => {
      if (destination && destination.index !== source.index) {
        dispatch(movePlayer(source.index, destination.index));
      }
    },
    [dispatch],
  );

  if (mode === EDIT) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="player-list">
          {({ droppableProps, innerRef: droppableRef, placeholder }) => (
            <List {...rest} {...droppableProps} ref={droppableRef}>
              {playerList.map((playerId, index) => (
                <Draggable
                  key={playerId}
                  disableInteractiveElementBlocking
                  draggableId={playerId}
                  index={index}
                >
                  {(
                    { draggableProps, dragHandleProps, innerRef: draggableRef },
                    { isDragging },
                  ) => {
                    let style = { ...draggableProps.style };

                    if (isDragging) {
                      const transition = theme.transitions.create(
                        'box-shadow',
                        {
                          duration: theme.transitions.duration.standard,
                        },
                      );

                      style = {
                        ...style,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.shadows[3],
                        pointerEvents: 'auto',
                        transition: style.transition
                          ? `${style.transition}, ${transition}`
                          : transition,
                        zIndex: 1,
                      };
                    }

                    if (style.transform) {
                      const transform = style.transform.replace(
                        /translate\(([0-9.-]+px), ([0-9.-]+px)\)/,
                        'translate(0, $2)',
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
                        className={clsx({ [classes.drag]: isDragging })}
                        ContainerProps={{
                          ...draggableProps,
                          style,
                        }}
                        dragHandleProps={dragHandleProps}
                        mode={mode}
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
    <List {...rest}>
      {playerList.map((playerId) => (
        <Item key={playerId} mode={mode} playerId={playerId} />
      ))}
    </List>
  );
};

HomePlayerList.propTypes = {
  mode: modeType,
};

HomePlayerList.defaultProps = {
  mode: undefined,
};

HomePlayerList.displayName = displayName;

export default HomePlayerList;
