import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItemIcon, withStyles } from '@material-ui/core';
import { Palette } from 'mdi-material-ui';
import clsx from 'clsx';

import { names as themeNames } from '../../../../styles/themes';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const styles = {
  root: {
    paddingBottom: 0,
    paddingTop: 0,
  },
};

const ThemeItem = ({ classes, className, theme, ...rest }) => (
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

export default withStyles(styles, { withTheme: true })(ThemeItem);
