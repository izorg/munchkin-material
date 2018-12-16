import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Add } from '@material-ui/icons';

import Fab from '../../../components/Fab';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButtonComponent = ({ intl, ...rest }) => (
  <Fab aria-label={intl.formatMessage(messages.label)} {...rest}>
    <Add />
  </Fab>
);

PlayerAddButtonComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PlayerAddButtonComponent);
