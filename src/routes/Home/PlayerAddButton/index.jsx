import React from 'react';
import { push } from 'connected-react-router';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Plus } from 'mdi-material-ui';

import Fab from '../../../components/Fab';

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
    <Fab
      aria-label={intl.formatMessage(messages.label)}
      onClick={onClick}
      {...props}
    >
      <Plus />
    </Fab>
  );
};

export default PlayerAddButton;
