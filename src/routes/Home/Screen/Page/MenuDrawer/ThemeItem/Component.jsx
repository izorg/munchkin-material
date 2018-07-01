import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaletteIcon from '@material-ui/icons/Palette';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

import { names as themeNames } from '../../../../../../styles/themes';

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
          <PaletteIcon style={{ color: theme.palette.primary.main }} />
        </ListItemIcon>
        <ListItemText
          primary={<FormattedMessage id="menu.theme" defaultMessage="Theme" />}
          secondary={themeNames[theme.id]}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ThemeItem);
