import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Plus } from 'mdi-material-ui';

import Fab from '../../../components/Fab';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButtonComponent = ({ intl, ...rest }) => (
  <Fab aria-label={intl.formatMessage(messages.label)} {...rest}>
    <Plus />
  </Fab>
);

PlayerAddButtonComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PlayerAddButtonComponent);
