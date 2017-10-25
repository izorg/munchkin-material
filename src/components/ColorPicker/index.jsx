import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import { withStyles } from 'material-ui/styles';

import { noop } from '../../constants';
import { classesObject } from '../../utils/propTypes';

const styles = {
  button: {
    borderRadius: '50%',
    padding: 0,
  },
};

const ColorPicker = ({ classes, onClick, value }) => (
  <ButtonBase className={classes.button} onClick={onClick}>
    <Avatar style={{ backgroundColor: value }} />
  </ButtonBase>
);

ColorPicker.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onClick: PropTypes.func,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onClick: noop,
  value: '',
};

export default withStyles(styles)(ColorPicker);
