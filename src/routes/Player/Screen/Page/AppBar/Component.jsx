import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import { noop } from 'lodash-es';

import DiceButton from '../../../../../components/dice/Button';
import Title from '../../../../../components/Title';

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

const Component = ({ classes, onBack, title }) => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton className={classes.leftButton} color="inherit" onClick={onBack}>
        <NavigationArrowBack />
      </IconButton>

      <Title>
        {title}
      </Title>

      <DiceButton
        className={classes.rightButton}
        color="inherit"
      />
    </Toolbar>
  </AppBar>
);

Component.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
};

Component.defaultProps = {
  onBack: noop,
  title: '',
};

export default withStyles(styles)(Component);
