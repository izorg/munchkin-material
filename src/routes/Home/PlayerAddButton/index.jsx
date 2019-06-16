import React from 'react';
import { push } from 'connected-react-router';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Plus } from 'mdi-material-ui';

import Fab from '../../../components/Fab';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButton = ({ intl, ...rest }) => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(push('?player'));

  return (
    <Fab
      aria-label={intl.formatMessage(messages.label)}
      onClick={onClick}
      {...rest}
    >
      <Plus />
    </Fab>
  );
};

PlayerAddButton.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PlayerAddButton);
