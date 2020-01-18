import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const displayName = 'CancelButton';

const CancelButton = (props) => <Button {...props} />;

CancelButton.defaultProps = {
  children: <FormattedMessage defaultMessage="Cancel" id="button.cancel" />,
  color: 'primary',
};

CancelButton.displayName = displayName;

export default CancelButton;
