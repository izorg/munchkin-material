import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, withStyles } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import cns from 'classnames';
import { noop } from 'lodash/fp';

const styles = (theme) => ({
  counter: {
    textAlign: 'center',
  },

  title: {
    color: theme.palette.text.primary,
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  button: {
    fontSize: 64,
    padding: 0,
  },

  icon: {
    fontSize: 'inherit',
  },

  value: {
    color: theme.palette.text.primary,
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 36,
  },
});

const Counter = ({
  classes,
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
  ...props
}) => (
  <div className={cns(className, classes.counter)} {...props}>
    <div className={classes.title}>{title}</div>

    <IconButton
      className={classes.button}
      data-screenshots="increment-button"
      disabled={incrementDisabled}
      onClick={onIncrement}
    >
      <ArrowDropUp className={classes.icon} />
    </IconButton>

    <div className={classes.value}>{value}</div>

    <IconButton
      className={classes.button}
      data-screenshots="decrement-button"
      disabled={decrementDisabled}
      onClick={onDecrement}
    >
      <ArrowDropDown className={classes.icon} />
    </IconButton>
  </div>
);

Counter.propTypes = {
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
  onDecrement: noop,
  onIncrement: noop,
};

export default withStyles(styles)(Counter);
