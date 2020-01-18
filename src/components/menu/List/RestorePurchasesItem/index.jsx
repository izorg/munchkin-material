import { ListItemIcon } from '@material-ui/core';
import { CloudDownloadOutline } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { useConfig } from '../../../ConfigProvider';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'RestorePurchasesItem';

const RestorePurchasesItem = (props) => {
  const { restorePurchases } = useConfig();

  const fullVersion = useSelector((state) => state.app.fullVersion);

  if (fullVersion || !restorePurchases) {
    return null;
  }

  return (
    <ListItem button onClick={restorePurchases} {...props}>
      <ListItemIcon>
        <CloudDownloadOutline />
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage
            defaultMessage="Restore purchases"
            id="menu.restorePurchases"
          />
        }
      />
    </ListItem>
  );
};

RestorePurchasesItem.displayName = displayName;

export default RestorePurchasesItem;
