import React from 'react';
import { push } from 'connected-react-router';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Menu } from 'mdi-material-ui';

import TopIconButton from '../../../../components/TopIconButton';
import { toggleMenu } from '../../../../ducks/app';
import { stringifyQuery } from '../../../../utils/location';

const messages = defineMessages({
  menu: {
    id: 'menu',
    defaultMessage: 'Menu',
  },
});

const MenuButton = ({ intl, ...rest }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mathes = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  const onClick = () =>
    mathes
      ? dispatch(toggleMenu())
      : dispatch(push({ search: stringifyQuery({ menu: null }) }));

  return (
    <Tooltip title={intl.formatMessage(messages.menu)}>
      <TopIconButton data-screenshots="menu" onClick={onClick} {...rest}>
        <Menu />
      </TopIconButton>
    </Tooltip>
  );
};

MenuButton.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MenuButton);
