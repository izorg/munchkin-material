import { Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
import { push } from 'connected-react-router';
import { Menu } from 'mdi-material-ui';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import TopIconButton from '../../../../components/TopIconButton';
import { toggleMenu } from '../../../../ducks/app';
import { getQuery, stringifyQuery } from '../../../../utils/location';

const displayName = 'MenuButton';

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

  const query = useSelector(getQuery);
  const mathes = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  const onClick = () =>
    mathes
      ? dispatch(toggleMenu())
      : dispatch(
          push({
            search: stringifyQuery({
              ...query,
              menu: null,
            }),
          }),
        );

  return (
    <Tooltip title={intl.formatMessage(messages.menu)}>
      <TopIconButton data-screenshots="menu" onClick={onClick} {...props}>
        <Menu />
      </TopIconButton>
    </Tooltip>
  );
};

MenuButton.displayName = displayName;

export default MenuButton;
