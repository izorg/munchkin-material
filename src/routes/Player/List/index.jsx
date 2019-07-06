import { List, ListItem, ListItemAvatar } from '@material-ui/core';
import { replace } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PlayerAvatar from '../../../components/PlayerAvatar';
import PlayerListItemText from '../../../components/PlayerListItemText';

const PlayerList = ({ selectedPlayerId, ...props }) => {
  const dispatch = useDispatch();

  const playerList = useSelector((state) => state.playerList);
  const players = useSelector((state) => state.players);

  return (
    <List {...props}>
      {playerList.map((playerId) => (
        <ListItem
          key={playerId}
          onClick={() => dispatch(replace(`/player/${playerId}`))}
          selected={playerId === selectedPlayerId}
        >
          <ListItemAvatar>
            <PlayerAvatar
              color={players[playerId].color}
              sex={players[playerId].sex}
            />
          </ListItemAvatar>
          <PlayerListItemText player={players[playerId]} />
        </ListItem>
      ))}
    </List>
  );
};

PlayerList.propTypes = {
  selectedPlayerId: PropTypes.string.isRequired,
};

PlayerList.displayName = 'PlayerList';

export default PlayerList;
