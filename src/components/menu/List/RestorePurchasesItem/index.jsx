import { ListItemIcon } from '@material-ui/core';
import { CloudDownloadOutline } from 'mdi-material-ui';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { useOptions } from '../../../OptionsProvider';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const VersionItem = (props) => {
  const { restorePurchases } = useOptions();

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

export default VersionItem;
