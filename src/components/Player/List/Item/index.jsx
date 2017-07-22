import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { ListItem } from 'material-ui/List';
import ActionReorder from 'material-ui/svg-icons/action/reorder';
import { Player } from 'munchkin';

import { noop } from '../../../../constants';
import getGenderIconClass from '../../../../helpers/getGenderIconClass';
import { ios } from '../../../../helpers/platforms';

import PlayerListItemAvatar from './Avatar';

import cn from './style.css';

const ItemHandle = SortableHandle(ActionReorder);

class PlayerListItem extends Component {
  componentWillMount() {
    this.handleCheck = this.handleCheck.bind(this);
    this.handleItemHandleStart = this.handleItemHandleStart.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleTap = this.handleTap.bind(this);
  }

  handleCheck() {
    const { onCheck, player } = this.props;

    if (this.preventCheck) {
      delete this.preventCheck;
    } else {
      onCheck(player);
    }
  }

  handleItemHandleStart(e) {
    e.stopPropagation();

    this.listItem.setState({ hovered: false });
  }

  handlePress() {
    const { onPress, player, showCheckbox, showDragHandle } = this.props;

    if (!showCheckbox && !showDragHandle) {
      this.listItem.setState({ hovered: false });

      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      onPress(player);

      // Safari fire onCheck event while changing mode to multi select
      if (ios) {
        this.preventCheck = true;
      }
    }
  }

  handleTap() {
    const { onTouchTap, player, showCheckbox } = this.props;

    if (!showCheckbox) {
      onTouchTap(player);
    }
  }

  render() {
    const { player, selected, showCheckbox, showDragHandle } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);
    const noTransition = showDragHandle ? { transition: undefined } : null;

    const additionalProps = {};

    let leftAvatar;
    let leftCheckbox;
    let leftIcon;

    if (!showCheckbox && !showDragHandle) {
      leftAvatar = (
        <PlayerListItemAvatar avatar={player.avatar} name={player.name} />
      );
    }

    if (showCheckbox) {
      leftCheckbox = <Checkbox checked={selected} onCheck={this.handleCheck} />;
    } else {
      Object.assign(additionalProps, {
        disableTouchRipple: true,
      });
    }

    if (showDragHandle) {
      leftIcon = (
        <ItemHandle
          onMouseDown={this.handleItemHandleStart}
          onTouchStart={this.handleItemHandleStart}
          style={noTransition}
        />
      );
    }

    return (
      <ListItem
        {...additionalProps}
        containerElement={
          <Tappable
            className="tappable"
            component="div"
            onTap={this.handleTap}
            onPress={this.handlePress}
            pressDelay={500}
          />
        }
        leftAvatar={leftAvatar}
        leftCheckbox={leftCheckbox}
        leftIcon={leftIcon}
        primaryText={<div className={cn.name}>{player.name}</div>}
        ref={(listItem) => {
          this.listItem = listItem;
        }}
        rightIcon={<GenderIcon style={noTransition} />}
        secondaryText={
          <p>
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
          </p>
        }
        secondaryTextLines={2}
        style={noTransition}
      />
    );
  }
}

PlayerListItem.propTypes = {
  onCheck: PropTypes.func,
  onPress: PropTypes.func,
  onTouchTap: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
  selected: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  showDragHandle: PropTypes.bool,
};

PlayerListItem.defaultProps = {
  onCheck: noop,
  onPress: noop,
  onTouchTap: noop,
  selected: false,
  showCheckbox: false,
  showDragHandle: false,
};

export default PlayerListItem;
