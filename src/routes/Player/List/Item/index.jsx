import { ListItem, ListItemAvatar } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { playerShape } from '../../../../utils/propTypes';

const displayName = 'PlayerListItem';

const PlayerListItem = ({ player, ...props }) => {
  const navigate = useNavigate();

  return (
    <ListItem
      button
      onClick={() => navigate(`/player/${player.id}`, { replace: true })}
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
