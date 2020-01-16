import { Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
import { push } from 'connected-react-router';
import { Menu } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import TopIconButton from '../../../../components/TopIconButton';
import { toggleMenu } from '../../../../ducks/app';
import { stringifyQuery } from '../../../../utils/location';

const messages = defineMessages({
  menu: {
    id: 'menu',
    defaultMessage: 'Menu',
  },
});

const MenuButton = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const mathes = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  const onClick = () =>
    mathes
      ? dispatch(toggleMenu())
      : dispatch(push({ search: stringifyQuery({ menu: null }) }));

  return (
    <Tooltip title={intl.formatMessage(messages.menu)}>
      <TopIconButton data-screenshots="menu" onClick={onClick} {...props}>
        <Menu />
      </TopIconButton>
    </Tooltip>
  );
};

export default MenuButton;
