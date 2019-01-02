import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@material-ui/core';

const SubmitButton = (props) => <Button {...props} />;

SubmitButton.defaultProps = {
  children: <FormattedMessage defaultMessage="OK" id="button.submit" />,
  color: 'primary',
  type: 'submit',
};

export default SubmitButton;
