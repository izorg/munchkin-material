import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@material-ui/core';

const SubmitButton = (props) => <Button {...props} />;

SubmitButton.defaultProps = {
  children: <FormattedMessage id="button.submit" defaultMessage="OK" />,
  color: 'primary',
  type: 'submit',
};

export default SubmitButton;
