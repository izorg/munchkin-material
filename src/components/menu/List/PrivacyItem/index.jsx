import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItemIcon } from '@material-ui/core';
import { ShieldAccount } from 'mdi-material-ui';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const PrivacyItem = (props) => (
  <ListItem
    button
    component="a"
    href="https://allmunchkins.com/privacy"
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

export default PrivacyItem;
