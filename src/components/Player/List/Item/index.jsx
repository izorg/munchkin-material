import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ActionReorder from 'material-ui-icons/Reorder';

import { noop } from '../../../../constants';
import getGenderIconClass from '../../../../helpers/getGenderIconClass';
import { ios } from '../../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../../utils/propTypes';

import PlayerListItemAvatar from './Avatar';
import Container from './Container';

const ItemHandle = SortableHandle(ActionReorder);

const styles = {
  item: {
    paddingRight: 0,
  },
};

class PlayerListItem extends Component {
  componentWillMount() {
    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    const { onPress, player } = this.props;

    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    onPress(player);

    if (ios || e.type === 'mousedown') {
      this.preventClick = true;
    }
  }

  handleClick() {
    const {
      onCheck, onClick, player, showCheckbox,
    } = this.props;

    if (showCheckbox) {
      if (this.preventClick) {
        delete this.preventClick;
      } else {
        onCheck(player);
      }
    } else {
      onClick(player);
    }
  }

  render() {
    const {
      classes, player, selected, showCheckbox, showDragHandle,
    } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);

    let leftAvatar;
    let leftCheckbox;
    let leftIcon;

    if (!showCheckbox && !showDragHandle) {
      leftAvatar = (
        <PlayerListItemAvatar
          avatar={player.avatar}
          name={player.name}
          style={{ marginRight: 8 }}
        />
      );
    }

    if (showCheckbox) {
      leftCheckbox = (
        <Checkbox
          checked={selected}
          disableRipple
          tabIndex="-1"
        />
      );
    }

    if (showDragHandle) {
      leftIcon = (
        <ListItemIcon>
          <ItemHandle
            style={{ marginRight: 24 }}
          />
        </ListItemIcon>
      );
    }

    return (
      <ListItem
        button
        className={classes.item}
        component={Container}
        onClick={this.handleClick}
        onPress={!showCheckbox && !showDragHandle ? this.handlePress : undefined}
      >
        {leftAvatar}
        {leftIcon}
        {leftCheckbox}
        <ListItemText
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
                  strength: <b>{player.strength}</b>,
                }}
              />
            </span>
          }
          style={{ overflow: 'hidden' }}
        />
        <ListItemIcon>
          <GenderIcon />
        </ListItemIcon>
      </ListItem>
    );
  }
}

PlayerListItem.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onCheck: PropTypes.func,
  onPress: PropTypes.func,
  onClick: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
  selected: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  showDragHandle: PropTypes.bool,
};

PlayerListItem.defaultProps = {
  onCheck: noop,
  onPress: noop,
  onClick: noop,
  selected: false,
  showCheckbox: false,
  showDragHandle: false,
};

export default withStyles(styles)(PlayerListItem);
