import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PaletteIcon from 'material-ui-icons/Palette';

import { names as themeNames } from '../../../../../../styles/themes';

class ThemeItem extends PureComponent {
  render() {
    const { theme } = this.props;

    return (
      <ListItem button component={Link} replace to="/?theme">
        <ListItemIcon>
          <PaletteIcon />
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
