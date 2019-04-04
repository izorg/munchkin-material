import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import { Palette } from '@material-ui/icons';
import clsx from 'clsx';

import { names as themeNames } from '../../../../styles/themes';

import ListItem from '../Item';

const styles = {
  root: {
    paddingBottom: 2,
    paddingTop: 2,
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
