import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ActionReorder from 'material-ui-icons/Reorder';

import { noop } from '../../../../constants';
import getGenderIconClass from '../../../../helpers/getGenderIconClass';
import { ios } from '../../../../helpers/platforms';
import { playerInstance } from '../../../../utils/propTypes';

import PlayerListItemAvatar from './Avatar';
import Container from './Container';

import cn from './style.css';

const ItemHandle = SortableHandle(ActionReorder);

class PlayerListItem extends Component {
  componentWillMount() {
    this.handlePress = this.handlePress.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const { onCheck, onClick, player, showCheckbox } = this.props;

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
    const { player, selected, showCheckbox, showDragHandle } = this.props;
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
        component={Container}
        disableRipple={showDragHandle}
        onClick={this.handleClick}
        onPress={!showCheckbox && !showDragHandle ? this.handlePress : undefined}
      >
        {leftAvatar}
        {leftIcon}
        {leftCheckbox}
        <ListItemText
          primary={<div className={cn.name}>{player.name}</div>}
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
        <ListItemIcon style={{ marginRight: 0 }}>
          <GenderIcon />
        </ListItemIcon>
      </ListItem>
    );
  }
}

PlayerListItem.propTypes = {
  onCheck: PropTypes.func,
  onPress: PropTypes.func,
  onClick: PropTypes.func,
  player: playerInstance.isRequired,
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

export default PlayerListItem;
