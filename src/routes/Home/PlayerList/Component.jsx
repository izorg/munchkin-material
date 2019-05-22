import React, { useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { List, makeStyles, RootRef } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { noop } from 'lodash/fp';

import { EDIT } from '../modes';
import modeType from '../modeType';

import Item from './Item';

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
  { name: 'HomePlayerList' },
);

const HomePlayerList = ({ mode, onPlayerMove, playerList, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleDragEnd = useCallback(
    ({ destination, source }) => {
      if (destination && destination.index !== source.index) {
        onPlayerMove(source.index, destination.index);
      }
    },
    [onPlayerMove],
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
                      <RootRef rootRef={draggableRef}>
                        <Item
                          className={clsx({ [classes.drag]: isDragging })}
                          ContainerProps={{
                            ...draggableProps,
                            style,
                          }}
                          dragHandleProps={dragHandleProps}
                          mode={mode}
                          playerId={playerId}
                        />
                      </RootRef>
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
  onPlayerMove: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string),
};

HomePlayerList.defaultProps = {
  mode: undefined,
  onPlayerMove: noop,
  playerList: [],
};

export default HomePlayerList;
