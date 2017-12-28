import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ContentAdd from 'material-ui-icons/Add';

import { noop } from '../../../../constants/index';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add',
  },
});

const FabAdd = ({ intl, onClick }) => (
  <Button
    aria-label={intl.formatMessage(messages.label)}
    color="primary"
    fab
    onClick={onClick}
  >
    <ContentAdd />
  </Button>
);

FabAdd.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  onClick: PropTypes.func,
};

FabAdd.defaultProps = {
  onClick: noop,
};

export default injectIntl(FabAdd);
