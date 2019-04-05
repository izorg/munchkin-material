import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import clsx from 'clsx';
import { noop } from 'lodash/fp';

import Button from './Button';

const useStyles = makeStyles(
  (theme) => ({
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
  }),
  { name: 'Counter' },
);

const Counter = ({
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.counter)} {...props}>
      <div className={classes.title}>{title}</div>

      <Button
        className={classes.button}
        data-screenshots="increment-button"
        disabled={incrementDisabled}
        onClick={onIncrement}
      >
        <ArrowDropUp className={classes.icon} />
      </Button>

      <div className={classes.value}>{value}</div>

      <Button
        className={classes.button}
        data-screenshots="decrement-button"
        disabled={decrementDisabled}
        onClick={onDecrement}
      >
        <ArrowDropDown className={classes.icon} />
      </Button>
    </div>
  );
};

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

export default Counter;
