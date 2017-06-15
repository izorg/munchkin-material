import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { noop } from '../../constants';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add a new munchkin',
  },
});

const AddButton = ({ intl, onClick }) => (
  <FloatingActionButton
    aria-label={intl.formatMessage(messages.label)}
    onClick={onClick}
  >
    <ContentAdd />
  </FloatingActionButton>
);

AddButton.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  onClick: noop,
};

export default injectIntl(AddButton);
