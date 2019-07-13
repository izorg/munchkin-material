import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { MenuDown, MenuUp } from 'mdi-material-ui';
import clsx from 'clsx';
import { noop } from 'lodash/fp';

import Button from './Button';
import CounterLabel from './Label';

const useStyles = makeStyles(
  (theme) => ({
    counter: {
      textAlign: 'center',
    },

    title: {
      fontSize: 24,
    },

    button: {
      fontSize: 64,
      padding: 0,
    },

    icon: {
      fontSize: 'inherit',
    },

    up: {
      transform: 'translateY(-2px)',
    },

    down: {
      transform: 'translateY(2px)',
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
      <CounterLabel className={classes.title}>{title}</CounterLabel>

      <Button
        className={classes.button}
        data-screenshots="increment-button"
        disabled={incrementDisabled}
        onClick={onIncrement}
      >
        <MenuUp className={clsx(classes.icon, classes.up)} />
      </Button>

      <div className={classes.value}>{value}</div>

      <Button
        className={classes.button}
        data-screenshots="decrement-button"
        disabled={decrementDisabled}
        onClick={onDecrement}
      >
        <MenuDown className={clsx(classes.icon, classes.down)} />
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

Counter.displayName = 'Counter';

export default Counter;
