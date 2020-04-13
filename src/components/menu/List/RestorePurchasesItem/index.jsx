import { ListItemIcon } from '@material-ui/core';
import { CloudDownloadOutline } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'RestorePurchasesItem';

const RestorePurchasesItem = () => {
  const { cordova, store } = window;

  const fullVersion = useSelector((state) => state.app.fullVersion);

  if (fullVersion || cordova?.platformId !== 'ios') {
    return null;
  }

  return (
    <ListItem button onClick={() => store?.refresh()}>
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
