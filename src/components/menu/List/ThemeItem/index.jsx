import { ListItemIcon, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { Palette } from 'mdi-material-ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import themes from '../../../../styles/themes';
import { parseSearch, stringifyQuery } from '../../../../utils/location';
import themeMessages from '../../../theme/messages';
import useMenuOpen from '../../useMenuOpen';
import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'ThemeItem';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  { name: displayName },
);

const ThemeItem = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const theme = useTheme();

  const themeKey = useSelector((state) => state.theme.id);

  const open = useMenuOpen();

  const onClick = () => {
    const location = {
      search: stringifyQuery({
        ...parseSearch(history.location.search),
        theme: null,
      }),
    };

    if (open) {
      history.replace(location);
    } else {
      history.push(location);
    }
  };

  return (
    <ListItem
      button
      className={clsx(className, classes.root)}
      onClick={onClick}
      {...rest}
    >
      <ListItemIcon>
        <Palette style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(themeMessages.label)}
        secondary={intl.formatMessage(themes[themeKey].messages.name)}
      />
    </ListItem>
  );
};

ThemeItem.displayName = displayName;

export default ThemeItem;
