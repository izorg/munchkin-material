import React from 'react';
import { FormattedMessage } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SecurityAccount from '../../icons/SecurityAccount';

const PrivacyItem = (props) => (
  <ListItem
    component="a"
    button
    href="https://allmunchkins.com/privacy.html"
    target="_blank"
    {...props}
  >
    <ListItemIcon>
      <SecurityAccount />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage
          id="menu.privacyPolicy"
          defaultMessage="Privacy Policy"
        />
      }
    />
  </ListItem>
);

export default PrivacyItem;
