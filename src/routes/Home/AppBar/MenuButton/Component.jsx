import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import TopIconButton from '../../../../components/TopIconButton';

const messages = defineMessages({
  menu: {
    id: 'menu',
    defaultMessage: 'Menu',
  },
});

const MenuButton = ({ intl, ...props }) => (
  <Tooltip title={intl.formatMessage(messages.menu)}>
    <TopIconButton data-screenshots="menu" {...props}>
      <Menu />
    </TopIconButton>
  </Tooltip>
);

MenuButton.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MenuButton);
