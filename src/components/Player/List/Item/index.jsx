import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import { ListItem } from 'material-ui/List';
import EditorDragHandle from 'material-ui/svg-icons/editor/drag-handle';
import { Player } from 'munchkin';

import cn from './style.css';

import { noop } from '../../../../constants';
import getGenderIconClass from '../../../../helpers/getGenderIconClass';

const ItemHandle = SortableHandle(EditorDragHandle);

class PlayerListItem extends Component {
  componentWillMount() {
    this.handleItemHandleStart = this.handleItemHandleStart.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleItemHandleStart() {
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
    }
  }

  handleTouchTap() {
    const { onTouchTap, player } = this.props;

    onTouchTap(player);
  }

  render() {
    const { player, selected, showCheckbox, showDragHandle } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);
    const noTransition = showDragHandle ? { transition: undefined } : null;

    let leftAvatar;
    let leftCheckbox;
    let leftIcon;

    if (!showCheckbox && !showDragHandle) {
      leftAvatar = <Avatar>{player.name.charAt(0).toUpperCase()}</Avatar>;
    }

    if (showCheckbox) {
      leftCheckbox = <Checkbox checked={selected} onCheck={this.handleTouchTap} />;
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
        containerElement="div"
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
      >
        <Tappable
          className={cn.tappable}
          component="div"
          onPress={this.handlePress}
          pressDelay={500}
        />
      </ListItem>
    );
  }
}

PlayerListItem.propTypes = {
  onPress: PropTypes.func,
  onTouchTap: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
  selected: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  showDragHandle: PropTypes.bool,
};

PlayerListItem.defaultProps = {
  onPress: noop,
  onTouchTap: noop,
  selected: false,
  showCheckbox: false,
  showDragHandle: false,
};

export default PlayerListItem;
