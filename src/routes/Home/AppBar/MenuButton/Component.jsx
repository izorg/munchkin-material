import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Menu } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';

import TopIconButton from '../../../../components/TopIconButton';

const messages = defineMessages({
  menu: {
    id: 'menu',
    defaultMessage: 'Menu',
  },
});

const MenuButton = ({ intl, onClick, ...rest }) => {
  const theme = useTheme();
  const mathes = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  return (
    <Tooltip title={intl.formatMessage(messages.menu)}>
      <TopIconButton
        data-screenshots="menu"
        onClick={() => onClick(mathes)}
        {...rest}
      >
        <Menu />
      </TopIconButton>
    </Tooltip>
  );
};

MenuButton.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default injectIntl(MenuButton);
