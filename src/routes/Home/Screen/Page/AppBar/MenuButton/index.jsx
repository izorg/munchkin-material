import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router/lib/actions';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

class MenuButton extends PureComponent {
  render() {
    return (
      <IconButton data-screenshots="menu" {...this.props}>
        <Menu />
      </IconButton>
    );
  }
}

const mapDispatchToProps = {
  onClick: () => push({ search: '?menu' }),
};

export default connect(undefined, mapDispatchToProps)(MenuButton);
