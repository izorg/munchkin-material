import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import { noop } from 'lodash-es';

import Title from '../../../../../components/Title';

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

const PlayerFormScreenAppBar = ({
  classes, onCancel, onSubmit, title,
}) => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton className={classes.leftButton} color="contrast" onClick={onCancel}>
        <NavigationArrowBack />
      </IconButton>

      <Title>
        {title}
      </Title>

      <IconButton className={classes.rightButton} color="contrast" onClick={onSubmit}>
        <NavigationCheck />
      </IconButton>
    </Toolbar>
  </AppBar>
);

PlayerFormScreenAppBar.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.node,
};

PlayerFormScreenAppBar.defaultProps = {
  onCancel: noop,
  onSubmit: noop,
  title: '',
};

export default withStyles(styles)(PlayerFormScreenAppBar);
