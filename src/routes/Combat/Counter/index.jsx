import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { MenuDown, MenuUp } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import CounterButton from '../../../components/Counter/Button';
import CounterLabel from '../../../components/Counter/Label';

const displayName = 'CombatCounter';

const useStyles = makeStyles(
  (theme) => ({
    counter: {
      textAlign: 'center',
    },

    title: {
      fontSize: 16,
    },

    button: {
      fontSize: 48,
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
      fontSize: theme.typography.h4.fontSize,
      lineHeight: theme.typography.h4.lineHeight,
    },

    '@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)': {
      title: {
        fontSize: 20,
      },

      button: {
        fontSize: 64,
        height: 64,
        width: 64,
      },
    },
  }),
  { name: displayName },
);

const CombatCounter = ({
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.counter)}>
      <CounterLabel className={classes.title}>{title}</CounterLabel>

      <CounterButton
        className={classes.button}
        disabled={incrementDisabled}
        onClick={onIncrement}
      >
        <MenuUp className={clsx(classes.icon, classes.up)} />
      </CounterButton>

      <div className={classes.value}>{value}</div>

      <CounterButton
        className={classes.button}
        disabled={decrementDisabled}
        onClick={onDecrement}
      >
        <MenuDown className={clsx(classes.icon, classes.down)} />
      </CounterButton>
    </div>
  );
};

CombatCounter.propTypes = {
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

CombatCounter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
};

CombatCounter.displayName = displayName;

export default CombatCounter;
