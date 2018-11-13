import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import ContentAdd from '@material-ui/icons/Add';

import Fab from '../../../components/Fab';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButtonComponent = ({ intl, ...rest }) => (
  <Fab aria-label={intl.formatMessage(messages.label)} {...rest}>
    <ContentAdd />
  </Fab>
);

PlayerAddButtonComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PlayerAddButtonComponent);
