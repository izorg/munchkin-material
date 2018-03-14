import React, { PureComponent } from 'react';
import Link from 'react-router-dom/Link';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui-icons/Menu';

class MenuButton extends PureComponent {
  render() {
    return (
      <IconButton
        component={Link}
        data-screenshots="menu"
        to={{ search: '?menu' }}
        {...this.props}
      >
        <Menu />
      </IconButton>
    );
  }
}

export default MenuButton;
