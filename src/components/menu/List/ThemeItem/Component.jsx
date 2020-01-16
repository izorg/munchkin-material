import { ListItemIcon, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { Palette } from 'mdi-material-ui';
import React from 'react';
import { useIntl } from 'react-intl';

import { names as themeNames } from '../../../../styles/themes';

import themeMessages from '../../../theme/messages';

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
  const intl = useIntl();
  const theme = useTheme();

  return (
    <ListItem button className={clsx(className, classes.root)} {...rest}>
      <ListItemIcon>
        <Palette style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(themeMessages.label)}
        secondary={themeNames[theme.id]}
      />
    </ListItem>
  );
};

export default ThemeItem;
