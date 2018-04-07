import React, { Fragment, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
// import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import ChevronUp from 'material-ui-icons/KeyboardArrowUp';
import ActionReorder from 'material-ui-icons/Reorder';
import cns from 'classnames';
import Hammer from 'hammerjs';
import { noop } from 'lodash';

import getSexIconClass from '../../../../../../utils/getSexIconClass';
import { playerShape } from '../../../../../../utils/propTypes';

import Avatar from '../../../../../../components/player/Avatar';
import ChevronDoubleUpIcon from '../../../../../../components/icons/ChevronDoubleUp';

import * as modes from '../../../../modes';
import modeShape from '../../../../modeShape';

const ItemHandle = SortableHandle(ActionReorder);

const styles = (theme) => ({
  secondaryActionPadding: {
    paddingRight: 40,
  },

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
    paddingRight: 12,
  },

  rightIcon: {
    marginRight: 0,
  },

  primary: {
    display: 'flex',
  },

  name: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  level: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: 4,
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

class HomeScreenPagePlayerListItemComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTap = this.handleTap.bind(this);
    this.handlePress = this.handlePress.bind(this);

    this.handleItemRef = this.handleItemRef.bind(this);
    this.handleAvatarRef = this.handleAvatarRef.bind(this);
    this.handleTextRef = this.handleTextRef.bind(this);
  }

  componentDidMount() {
    this.updateHammer();
  }

  componentDidUpdate() {
    this.updateHammer();
  }

  componentWillUnmount() {
    this.removeHammer();
  }

  handleTap(event) {
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
    } else if (event.target === this.avatar) {
      onMultiSelectActivate(player.id);
    } else {
      onPlayerSelect(player.id);
    }
  }

  handlePress(event) {
    const { mode, onMultiSelectActivate, player } = this.props;

    if (!mode && this.text.contains(event.target)) {
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      onMultiSelectActivate(player.id);
    }
  }

  handleAvatarRef(node) {
    // eslint-disable-next-line react/no-find-dom-node
    this.avatar = node ? findDOMNode(node) : null;
  }

  handleItemRef(node) {
    // eslint-disable-next-line react/no-find-dom-node
    this.item = node ? findDOMNode(node) : null;
  }

  handleTextRef(node) {
    // eslint-disable-next-line react/no-find-dom-node
    this.text = node ? findDOMNode(node) : null;
  }

  updateHammer() {
    this.removeHammer();

    this.hammer = new Hammer(this.item, {
      recognizers: [[Hammer.Tap, { time: 500 }], [Hammer.Press, { time: 501 }]],
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
    const { classes, mode, player, selected } = this.props;
    const SexIcon = getSexIconClass(player.sex);

    return (
      <ListItem
        button
        classes={{
          gutters: classes.listItemGutters,
        }}
        className={cns({
          [classes.secondaryActionPadding]: mode === modes.EDIT,
        })}
        component={mode === modes.EDIT ? 'div' : 'li'}
        data-screenshots="player-list-item"
        ref={this.handleItemRef}
      >
        <Avatar
          color={player.color}
          name={player.name}
          ref={this.handleAvatarRef}
          selected={selected}
        />

        <ListItemText
          // className={classes.text}
          classes={{
            root: classes.text,
            primary: classes.primary,
          }}
          primary={
            <Fragment>
              <span className={classes.name}>{player.name}</span>

              <span className={classes.level}>
                {player.level}
                <ChevronUp />
              </span>

              <span className={classes.strength}>
                {player.level + player.gear}
                <ChevronDoubleUpIcon />
              </span>
            </Fragment>
          }
          ref={this.handleTextRef}
        />

        {mode === modes.EDIT ? (
          <ListItemSecondaryAction
            classes={{
              root: classes.listItemSecondaryActionRoot,
            }}
          >
            <IconButton disableRipple tabIndex={-1}>
              <ItemHandle />
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          <ListItemIcon className={classes.rightIcon}>
            <SexIcon />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
}

HomeScreenPagePlayerListItemComponent.propTypes = {
  mode: modeShape,
  onMultiSelectActivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onPlayerToggle: PropTypes.func,
  player: playerShape.isRequired,
  selected: PropTypes.bool,
};

HomeScreenPagePlayerListItemComponent.defaultProps = {
  mode: null,
  onMultiSelectActivate: noop,
  onPlayerEdit: noop,
  onPlayerSelect: noop,
  onPlayerToggle: noop,
  selected: false,
};

export default withStyles(styles)(HomeScreenPagePlayerListItemComponent);
