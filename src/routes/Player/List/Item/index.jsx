import { ListItem, ListItemAvatar } from '@material-ui/core';
import { replace } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { playerShape } from '../../../../utils/propTypes';

const displayName = 'PlayerListItem';

const PlayerListItem = ({ player, ...props }) => {
  const dispatch = useDispatch();

  return (
    <ListItem
      button
      onClick={() => dispatch(replace(`/player/${player.id}`))}
      {...props}
    >
      <ListItemAvatar>
        <PlayerAvatar color={player.color} name={player.name} />
      </ListItemAvatar>
      <PlayerListItemText player={player} />
    </ListItem>
  );
};

PlayerListItem.propTypes = {
  player: playerShape.isRequired,
};

PlayerListItem.displayName = displayName;

export default PlayerListItem;
