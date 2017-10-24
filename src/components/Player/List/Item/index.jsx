import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ActionReorder from 'material-ui-icons/Reorder';

import { noop } from '../../../../constants';
import getGenderIconClass from '../../../../helpers/getGenderIconClass';
import { ios } from '../../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../../utils/propTypes';

import PlayerListItemAvatar from './Avatar';

const Container = props => <Tappable component="li" pressDelay={500} {...props} />;
const ItemHandle = SortableHandle(ActionReorder);

const styles = {
  text: {
    overflow: 'hidden',
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
      onCheck, onClick, player, multiMode,
    } = this.props;

    if (multiMode) {
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
      classes, color, player, selected, multiMode, editMode,
    } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);

    return (
      <ListItem
        button
        component={Container}
        onClick={this.handleClick}
        onPress={!multiMode && !editMode ? this.handlePress : undefined}
      >
        <PlayerListItemAvatar
          color={color}
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
                  strength: <b>{player.strength}</b>,
                }}
              />
            </span>
          }
        />

        <ListItemSecondaryAction>
          <IconButton disableRipple>
            {editMode ? (
              <ItemHandle />
            ) : (
              <GenderIcon onClick={this.handleClick} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

PlayerListItem.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  color: PropTypes.string,
  editMode: PropTypes.bool,
  multiMode: PropTypes.bool,
  onCheck: PropTypes.func,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
  selected: PropTypes.bool,
};

PlayerListItem.defaultProps = {
  color: '',
  editMode: false,
  multiMode: false,
  onCheck: noop,
  onClick: noop,
  onPress: noop,
  selected: false,
};

export default withStyles(styles)(PlayerListItem);
