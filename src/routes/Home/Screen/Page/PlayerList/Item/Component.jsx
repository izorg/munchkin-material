import React, { PureComponent } from 'react';
import Hammer from 'react-hammerjs';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ActionReorder from 'material-ui-icons/Reorder';

import noop from '../../../../../../utils/noop';
import getGenderIconClass from '../../../../../../utils/getGenderIconClass';
import { classesObject, playerInstance } from '../../../../../../utils/propTypes';

import * as modes from '../../../../modes';

import Avatar from './Avatar';

const ItemHandle = SortableHandle(ActionReorder);

const styles = theme => ({
  listItemGutters: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24,
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
});

class HomeScreenPagePlayerListItemComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTap = this.handleTap.bind(this);
    this.handlePress = this.handlePress.bind(this);

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
      <div {...params} ref={(node) => { this.avatarNode = node; }} />
    );
  }

  handleTap(e) {
    const { onAvatarTap, onTap, player } = this.props;

    // console.log('tap', this.avatarNode, e.target);

    if (e.target === this.avatarNode) {
      onAvatarTap(player.id);
    } else {
      onTap(player.id);
    }
  }

  handlePress() {
    const { onPress, player } = this.props;

    onPress(player.id);
  }

  render() {
    const {
      classes, color, mode, onGenderToggle, player, selected,
    } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);

    return (
      <ListItem
        button
        classes={{
          gutters: classes.listItemGutters,
        }}
        component={this.container}
      >
        <Avatar
          color={color}
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

        <ListItemSecondaryAction
          classes={{
            root: classes.listItemSecondaryActionRoot,
          }}
        >
          <IconButton component="span" disableRipple={mode === modes.EDIT}>
            {mode === modes.EDIT ? (
              <ItemHandle />
            ) : (
              <GenderIcon onClick={() => onGenderToggle(player.id)} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

HomeScreenPagePlayerListItemComponent.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  color: PropTypes.string,
  mode: PropTypes.oneOf(Object.values(modes)),
  onAvatarTap: PropTypes.func,
  onGenderToggle: PropTypes.func,
  onPress: PropTypes.func,
  onTap: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
  selected: PropTypes.bool,
};

HomeScreenPagePlayerListItemComponent.defaultProps = {
  color: '',
  mode: null,
  onAvatarTap: noop,
  onGenderToggle: noop,
  onPress: noop,
  onTap: noop,
  selected: false,
};

export default withStyles(styles)(HomeScreenPagePlayerListItemComponent);
