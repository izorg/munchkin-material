import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { Palette } from '@material-ui/icons';
import cns from 'classnames';

import { names as themeNames } from '../../../../styles/themes';

const styles = {
  root: {
    paddingBottom: 2,
    paddingTop: 2,
  },
};

class ThemeItem extends PureComponent {
  render() {
    const { classes, className, theme, ...rest } = this.props;

    return (
      <ListItem button className={cns(className, classes.root)} {...rest}>
        <ListItemIcon>
          <Palette style={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText
          primary={<FormattedMessage defaultMessage="Theme" id="menu.theme" />}
          secondary={themeNames[theme.id]}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ThemeItem);
