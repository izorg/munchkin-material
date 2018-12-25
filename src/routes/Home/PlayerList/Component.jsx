import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { List, RootRef, withStyles } from '@material-ui/core';
import cns from 'classnames';
import { noop } from 'lodash/fp';

import { EDIT } from '../modes';

import Item from './Item';
import modeShape from '../modeShape';

const styles = {
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
};

class HomePlayerList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragStart() {
    this.setState({
      dragging: true,
    });
  }

  handleDragEnd({ destination, source }) {
    const { onPlayerMove } = this.props;

    if (destination && destination.index !== source.index) {
      onPlayerMove(source.index, destination.index);
    }

    this.setState({
      dragging: false,
    });
  }

  render() {
    const {
      classes,
      mode,
      onPlayerMove,
      playerList,
      theme,
      ...rest
    } = this.props;

    const { dragging } = this.state;

    if (mode === EDIT) {
      return (
        <DragDropContext
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        >
          <Droppable droppableId="player-list">
            {({ droppableProps, innerRef: droppableRef }) => (
              <RootRef rootRef={droppableRef}>
                <List
                  className={cns({ [classes.dragging]: dragging })}
                  {...rest}
                  {...droppableProps}
                >
                  {playerList.map((playerId, index) => (
                    <Draggable
                      disableInteractiveElementBlocking
                      draggableId={playerId}
                      index={index}
                      key={playerId}
                    >
                      {(
                        {
                          draggableProps,
                          dragHandleProps,
                          innerRef: draggableRef,
                        },
                        { isDragging },
                      ) => {
                        let style = { ...draggableProps.style };

                        const transition = theme.transitions.create(
                          'box-shadow',
                          {
                            duration: theme.transitions.duration.standard,
                          },
                        );

                        style = {
                          ...style,
                          transition: style.transition
                            ? `${style.transition}, ${transition}`
                            : transition,
                        };

                        if (isDragging) {
                          style = {
                            ...style,
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.shadows[3],
                            pointerEvents: 'auto',
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
                              className={cns({ [classes.drag]: isDragging })}
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
                </List>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
      );
    }

    return (
      <List {...rest}>
        {playerList.map((playerId, index) => (
          <Item index={index} key={playerId} mode={mode} playerId={playerId} />
        ))}
      </List>
    );
  }
}

HomePlayerList.propTypes = {
  mode: modeShape,
  onPlayerMove: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string),
};

HomePlayerList.defaultProps = {
  mode: undefined,
  onPlayerMove: noop,
  playerList: [],
};

export default withStyles(styles, { withTheme: true })(HomePlayerList);
