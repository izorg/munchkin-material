import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  RootRef,
  withStyles,
} from '@material-ui/core';
import { KeyboardArrowUp, Reorder } from '@material-ui/icons';
import { ChevronDoubleUp } from 'mdi-material-ui';
import clsx from 'clsx';
import Hammer from 'hammerjs';
import { debounce, noop } from 'lodash/fp';

import { playerShape } from '../../../../utils/propTypes';

import Avatar from './Avatar';

import * as modes from '../../modes';
import modeType from '../../modeType';

const styles = (theme) => ({
  listItemGutters: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },

  listItemSecondaryActionRoot: {
    [theme.breakpoints.up('sm')]: {
      right: 12,
    },
  },

  text: {
    paddingRight: 0,
  },

  rightIcon: {
    marginRight: 0,
  },

  primary: {
    alignItems: 'center',
    display: 'flex',
  },

  name: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  level: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(1),
    width: 44,
  },

  strength: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: 4,
    width: 48,
  },
});

class HomePlayerListItem extends Component {
  constructor(props) {
    super(props);

    this.avatarRef = createRef();
    this.itemRef = createRef();
    this.textRef = createRef();

    this.handleTap = debounce(30, this.handleTap.bind(this));
    this.handlePress = debounce(30, this.handlePress.bind(this));
  }

  componentDidMount() {
    this.addHammer();
  }

  componentWillUnmount() {
    this.removeHammer();
  }

  handleTap(event) {
    if (event.srcEvent.defaultPrevented) {
      return;
    }

    const {
      mode,
      onMultiSelectActivate,
      onPlayerEdit,
      onPlayerSelect,
      onPlayerToggle,
      player,
    } = this.props;

    if (mode === modes.EDIT) {
      onPlayerEdit(player.id);
    } else if (mode === modes.MULTI) {
      onPlayerToggle(player.id);
    } else if (this.avatarRef.current.contains(event.target)) {
      onMultiSelectActivate(player.id);
    } else {
      onPlayerSelect(player.id);
    }
  }

  handlePress(event) {
    const { mode, onMultiSelectActivate, player } = this.props;

    if (!mode && this.textRef.current.contains(event.target)) {
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      onMultiSelectActivate(player.id);
    }
  }

  addHammer() {
    const pressTime = 500;

    this.hammer = new Hammer(this.itemRef.current, {
      recognizers: [
        [Hammer.Tap, { time: pressTime - 1 }],
        [Hammer.Press, { time: pressTime }],
      ],
    });

    this.hammer.on('tap', this.handleTap);
    this.hammer.on('press', this.handlePress);
  }

  removeHammer() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();

      this.hammer = null;
    }
  }

  render() {
    const {
      classes,
      dragHandleProps,
      mode,
      onMultiSelectActivate,
      onPlayerEdit,
      onPlayerSelect,
      onPlayerToggle,
      player,
      selected,
      ...rest
    } = this.props;

    const editMode = mode === modes.EDIT;

    return (
      <RootRef rootRef={this.itemRef}>
        <ListItem
          button
          classes={{
            gutters: classes.listItemGutters,
          }}
          component={editMode ? 'div' : 'li'}
          data-screenshots="player-list-item"
          {...rest}
        >
          <RootRef rootRef={this.avatarRef}>
            <Avatar color={player.color} selected={selected} sex={player.sex} />
          </RootRef>

          <RootRef rootRef={this.textRef}>
            <ListItemText
              classes={{
                root: clsx({ [classes.text]: !editMode }),
                primary: classes.primary,
              }}
              primary={
                <>
                  <span className={classes.name}>{player.name}</span>

                  {!editMode && (
                    <>
                      <span className={classes.level}>
                        {player.level}
                        <KeyboardArrowUp />
                      </span>

                      <span className={classes.strength}>
                        {player.level + player.gear}
                        <ChevronDoubleUp />
                      </span>
                    </>
                  )}
                </>
              }
            />
          </RootRef>

          {editMode && (
            <ListItemSecondaryAction
              classes={{
                root: classes.listItemSecondaryActionRoot,
              }}
            >
              <IconButton
                disableRipple
                focusVisibleClassName=""
                {...dragHandleProps}
              >
                <Reorder />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </RootRef>
    );
  }
}

HomePlayerListItem.propTypes = {
  dragHandleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  mode: modeType,
  onMultiSelectActivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onPlayerToggle: PropTypes.func,
  player: playerShape.isRequired,
  selected: PropTypes.bool,
};

HomePlayerListItem.defaultProps = {
  dragHandleProps: undefined,
  mode: null,
  onMultiSelectActivate: noop,
  onPlayerEdit: noop,
  onPlayerSelect: noop,
  onPlayerToggle: noop,
  selected: false,
};

export default withStyles(styles)(HomePlayerListItem);
