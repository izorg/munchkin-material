import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash';

const styles = {
  button: {
    borderRadius: '50%',
    height: 48,
    marginLeft: -6,
    padding: 0,
    width: 48,
  },

  color: {
    height: 36,
    width: 36,
  },
};

const ColorPicker = ({ classes, onClick, value }) => (
  <ButtonBase centerRipple className={classes.button} focusRipple onClick={onClick}>
    <Avatar className={classes.color} style={{ backgroundColor: value }} />
  </ButtonBase>
);

ColorPicker.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onClick: noop,
  value: '',
};

export default withStyles(styles)(ColorPicker);
