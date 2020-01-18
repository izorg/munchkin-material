import { push } from 'connected-react-router';
import { Plus } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import DialogFab from '../../../components/DialogFab';

const displayName = 'PlayerAddButton';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButton = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const onClick = () => dispatch(push('?player'));

  return (
    <DialogFab
      aria-label={intl.formatMessage(messages.label)}
      onClick={onClick}
      {...props}
    >
      <Plus />
    </DialogFab>
  );
};

PlayerAddButton.displayName = displayName;

export default PlayerAddButton;
