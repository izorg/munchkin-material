import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { Shuffle } from 'mdi-material-ui';

import TopIconButton from '../../../../components/TopIconButton';
import { shufflePlayers } from '../../../../ducks/playerList';

const messages = defineMessages({
  shuffle: {
    id: 'player.list.shuffle',
    defaultMessage: 'Shuffle players',
  },
});

const ShuffleButton = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  return (
    <Tooltip title={intl.formatMessage(messages.shuffle)}>
      <TopIconButton onClick={() => dispatch(shufflePlayers())} {...props}>
        <Shuffle />
      </TopIconButton>
    </Tooltip>
  );
};

ShuffleButton.displayName = 'ShuffleButton';

export default ShuffleButton;
