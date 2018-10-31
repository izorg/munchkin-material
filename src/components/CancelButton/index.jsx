import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';

const CancelButton = (props) => <Button {...props} />;

CancelButton.defaultProps = {
  children: <FormattedMessage id="button.cancel" defaultMessage="Cancel" />,
  color: 'primary',
};

export default CancelButton;
