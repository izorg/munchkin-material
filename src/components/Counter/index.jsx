import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import {
  MenuDown as DecrementIcon,
  MenuUp as IncrementIcon,
} from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages } from 'react-intl';

import Button from './Button';
import CounterLabel from './Label';

const displayName = 'Counter';

export const counterMessages = defineMessages({
  gear: {
    id: 'counter.gear',
    defaultMessage: 'Gear',
  },
  level: {
    id: 'counter.level',
    defaultMessage: 'Level',
  },
  modifier: {
    id: 'counter.modifier',
    defaultMessage: 'Modifier',
  },
  strength: {
    id: 'counter.strength',
    defaultMessage: 'Strength',
  },
});

const useStyles = makeStyles(
  (theme) => ({
    counter: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    },

    title: {
      fontSize: 24,
    },

    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
      maxWidth: '120px',
      width: '100%',
    },

    button: {
      fontSize: 48,
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
  { name: displayName },
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

      <div className={classes.value}>{value}</div>

      <div className={classes.buttons}>
        <Button
          className={classes.button}
          data-screenshots="decrement-button"
          disabled={decrementDisabled}
          onClick={onDecrement}
        >
          <DecrementIcon className={classes.icon} />
        </Button>

        <Button
          className={classes.button}
          data-screenshots="increment-button"
          disabled={incrementDisabled}
          onClick={onIncrement}
        >
          <IncrementIcon className={classes.icon} />
        </Button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
};

Counter.displayName = displayName;

export default Counter;
