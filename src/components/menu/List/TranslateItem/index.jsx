import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItemIcon } from '@material-ui/core';
import { Translate } from 'mdi-material-ui';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const TranslateItem = (props) => (
  <ListItem
    button
    component="a"
    href="https://poeditor.com/join/project/ZMBvWu9xIw"
    target="_blank"
    {...props}
  >
    <ListItemIcon>
      <Translate />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage defaultMessage="Translate" id="menu.translate" />
      }
    />
  </ListItem>
);

export default TranslateItem;
