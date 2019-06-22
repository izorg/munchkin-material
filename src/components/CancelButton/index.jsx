import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@material-ui/core';

const CancelButton = (props) => <Button {...props} />;

CancelButton.defaultProps = {
  children: <FormattedMessage defaultMessage="Cancel" id="button.cancel" />,
  color: 'primary',
};

CancelButton.displayName = 'CancelButton';

export default CancelButton;
