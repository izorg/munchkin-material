import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItemIcon, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Palette } from 'mdi-material-ui';
import clsx from 'clsx';

import { names as themeNames } from '../../../../styles/themes';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  { name: 'ThemeItem' },
);

const ThemeItem = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem button className={clsx(className, classes.root)} {...rest}>
      <ListItemIcon>
        <Palette style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText
        primary={<FormattedMessage defaultMessage="Theme" id="menu.theme" />}
        secondary={themeNames[theme.id]}
      />
    </ListItem>
  );
};

export default ThemeItem;
