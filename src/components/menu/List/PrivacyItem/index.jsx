import { ListItemIcon } from '@material-ui/core';
import { ShieldAccount } from 'mdi-material-ui';
import { FormattedMessage } from 'react-intl';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'PrivacyItem';

const PrivacyItem = (props) => {
  if (!window.cordova) {
    return null;
  }

  return (
    <ListItem
      button
      component="a"
      href="https://allmunchkins.com/privacy"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <ListItemIcon>
        <ShieldAccount />
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage
            defaultMessage="Privacy Policy"
            id="menu.privacyPolicy"
          />
        }
      />
    </ListItem>
  );
};

PrivacyItem.displayName = displayName;

export default PrivacyItem;
