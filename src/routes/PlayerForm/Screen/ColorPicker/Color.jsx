import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import { withStyles } from 'material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import cns from 'classnames';

const styles = {
  button: {
    borderRadius: '50%',
    height: 48,
    padding: 0,
    width: 48,
  },

  color: {
    height: 36,
    width: 36,
  },
};

const Color = ({ classes, className, selected, value, ...props }) => (
  <ButtonBase
    centerRipple
    className={cns(classes.button, className)}
    focusRipple
    value={value}
    {...props}
  >
    <Avatar className={classes.color} style={{ backgroundColor: value }}>
      {selected && <CheckIcon />}
    </Avatar>
  </ButtonBase>
);

Color.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Color.defaultProps = {
  selected: false,
};

export default withStyles(styles)(Color);
