import { Plus } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import ScreenFab from '../../../components/ScreenFab';
import { parseSearch, stringifyQuery } from '../../../utils/location';

const displayName = 'PlayerAddButton';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButton = (props) => {
  const history = useHistory();
  const intl = useIntl();

  const onClick = () => {
    const query = parseSearch(history.location.search);

    history.push({
      search: stringifyQuery({
        ...query,
        player: null,
      }),
    });
  };

  return (
    <ScreenFab
      aria-label={intl.formatMessage(messages.label)}
      onClick={onClick}
      {...props}
    >
      <Plus />
    </ScreenFab>
  );
};

PlayerAddButton.displayName = displayName;

export default PlayerAddButton;
