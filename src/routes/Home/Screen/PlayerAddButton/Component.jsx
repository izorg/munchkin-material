import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ContentAdd from '@material-ui/icons/Add';
import { noop } from 'lodash';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const PlayerAddButtonComponent = ({ intl, onClick }) => (
  <Button
    aria-label={intl.formatMessage(messages.label)}
    color="primary"
    onClick={onClick}
    variant="fab"
  >
    <ContentAdd />
  </Button>
);

PlayerAddButtonComponent.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func,
};

PlayerAddButtonComponent.defaultProps = {
  onClick: noop,
};

export default injectIntl(PlayerAddButtonComponent);
