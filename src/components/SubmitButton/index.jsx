import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const displayName = 'SubmitButton';

const SubmitButton = (props) => <Button {...props} />;

SubmitButton.defaultProps = {
  children: <FormattedMessage defaultMessage="OK" id="button.submit" />,
  color: 'primary',
  type: 'submit',
};

SubmitButton.displayName = displayName;

export default SubmitButton;
