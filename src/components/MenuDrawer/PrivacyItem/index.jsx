import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ShieldAccount } from 'mdi-material-ui';

const PrivacyItem = (props) => (
  <ListItem
    component="a"
    button
    href="https://allmunchkins.com/privacy.html"
    target="_blank"
    {...props}
  >
    <ListItemIcon>
      <ShieldAccount />
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
