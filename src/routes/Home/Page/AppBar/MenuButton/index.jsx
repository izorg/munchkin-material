import React, { PureComponent } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import { stringifyQuery } from '../../../../../utils/location';

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
  onClick: () => push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  undefined,
  mapDispatchToProps,
)(MenuButton);
