import { ListItemIcon } from '@material-ui/core';
import { ShieldAccount } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useConfig } from '../../../ConfigProvider';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const PrivacyItem = (props) => {
  const { privacyLink } = useConfig();

  if (!privacyLink) {
    return null;
  }

  return (
    <ListItem
      button
      component="a"
      href={privacyLink}
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

export default PrivacyItem;
