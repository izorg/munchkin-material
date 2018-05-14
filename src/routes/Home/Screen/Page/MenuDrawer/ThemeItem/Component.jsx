import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaletteIcon from '@material-ui/icons/Palette';

import themes, { names as themeNames } from '../../../../../../styles/themes';

class ThemeItem extends PureComponent {
  render() {
    const { theme, ...rest } = this.props;

    return (
      <ListItem button {...rest}>
        <ListItemIcon>
          <PaletteIcon style={{ color: themes[theme].palette.primary.main }} />
        </ListItemIcon>
        <ListItemText
          primary={<FormattedMessage id="menu.theme" defaultMessage="Theme" />}
          secondary={themeNames[theme]}
        />
      </ListItem>
    );
  }
}

ThemeItem.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default ThemeItem;
