import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const displayName = 'CancelButton';

const CancelButton = (props) => <Button {...props} />;

CancelButton.defaultProps = {
  children: <FormattedMessage defaultMessage="Cancel" id="button.cancel" />,
  color: 'primary',
  type: 'button',
};

CancelButton.displayName = displayName;

export default CancelButton;
