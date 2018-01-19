import React, { PureComponent } from 'react';
import Hammer from 'react-hammerjs';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ActionReorder from 'material-ui-icons/Reorder';
import cns from 'classnames';
import { noop } from 'lodash-es';

import getGenderIconClass from '../../../../../../../utils/getGenderIconClass';
import { playerShape } from '../../../../../../../utils/propTypes';

import * as modes from '../../../../modes';

import Avatar from './Avatar';

const ItemHandle = SortableHandle(ActionReorder);

const styles = theme => ({
  secondaryActionPadding: {
    paddingRight: 36,
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
    overflow: 'hidden',
  },

  rightIcon: {
    marginRight: 0,
  },
});

class HomeScreenPagePlayerListItemComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.handleTap = this.handleTap.bind(this);

    this.container = ({ children, ...rest }) => (
      <Hammer
        {...rest}
        onPress={this.handlePress}
        onTap={this.handleTap}
        options={{
          recognizers: {
            press: {
              time: 501,
            },
            tap: {
              time: 500,
            },
          },
        }}
      >
        <div>{children}</div>
      </Hammer>
    );

    this.avatarComponent = params => (
      <div
        {...params}
        ref={(node) => {
          this.avatarNode = node;
        }}
      />
    );
  }

  handleTap(e) {
    const {
      mode, onMultiSelectActivate, onPlayerEdit, onPlayerSelect, onPlayerToggle, player,
    } = this.props;

    if (mode === modes.EDIT) {
      onPlayerEdit(player.id);
    } else if (mode === modes.MULTI) {
      onPlayerToggle(player.id);
    } else if (e.target === this.avatarNode) {
      onMultiSelectActivate(player.id);
    } else {
      onPlayerSelect(player.id);
    }
  }

  handlePress() {
    const { mode, onMultiSelectActivate, player } = this.props;

    if (!mode) {
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      onMultiSelectActivate(player.id);
    }
  }

  render() {
    const {
      classes, mode, player, selected,
    } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);

    return (
      <ListItem
        button
        classes={{
          gutters: classes.listItemGutters,
        }}
        className={cns({ [classes.secondaryActionPadding]: mode === modes.EDIT })}
        component={this.container}
      >
        <Avatar
          color={player.color}
          component={this.avatarComponent}
          name={player.name}
          selected={selected}
        />

        <ListItemText
          className={classes.text}
          primary={<Typography component="div" noWrap>{player.name}</Typography>}
          secondary={
            <span>
              <FormattedMessage
                id="player.list.item.secondaryTextLevel"
                defaultMessage="Level {level}"
                values={{
                  level: <b>{player.level}</b>,
                }}
              />
              <br />
              <FormattedMessage
                id="player.list.item.secondaryTextStrength"
                defaultMessage="Strength {strength}"
                values={{
                  strength: <b>{player.level + player.gear}</b>,
                }}
              />
            </span>
          }
        />

        {mode === modes.EDIT ? (
          <ListItemSecondaryAction
            classes={{
              root: classes.listItemSecondaryActionRoot,
            }}
          >
            <IconButton component="span" disableRipple>
              <ItemHandle />
            </IconButton>
          </ListItemSecondaryAction>
        ) : (
          <ListItemIcon className={classes.rightIcon}>
            <GenderIcon />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
}

HomeScreenPagePlayerListItemComponent.propTypes = {
  mode: PropTypes.oneOf(Object.values(modes)),
  onMultiSelectActivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onPlayerToggle: PropTypes.func,
  player: playerShape.isRequired, // eslint-disable-line react/no-typos
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
