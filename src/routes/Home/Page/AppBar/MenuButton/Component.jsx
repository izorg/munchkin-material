import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { IconButton, Tooltip } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const messages = defineMessages({
  menu: {
    id: 'menu',
    defaultMessage: 'Menu',
  },
});

const MenuButton = ({ intl, ...props }) => (
  <Tooltip title={intl.formatMessage(messages.menu)}>
    <IconButton data-screenshots="menu" {...props}>
      <Menu />
    </IconButton>
  </Tooltip>
);

export default injectIntl(MenuButton);
