import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import ContentAdd from 'material-ui-icons/Add';

import { noop } from '../constants';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const NewPlayerButton = ({ intl, onClick }) => (
  <Tooltip title={intl.formatMessage(messages.label)}>
    <FloatingActionButton
      aria-label={intl.formatMessage(messages.label)}
      color="primary"
      fab
      onClick={onClick}
    >
      <ContentAdd />
    </FloatingActionButton>
  </Tooltip>
);

NewPlayerButton.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  onClick: PropTypes.func,
};

NewPlayerButton.defaultProps = {
  onClick: noop,
};

export default injectIntl(NewPlayerButton);
