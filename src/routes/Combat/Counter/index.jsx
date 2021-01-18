import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { MenuDown, MenuUp } from 'mdi-material-ui';
import PropTypes from 'prop-types';

import CounterButton from '../../../components/Counter/Button';
import CounterLabel from '../../../components/Counter/Label';

const displayName = 'CombatCounter';

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
  (theme) => ({
    counter: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    },

    title: {
      fontSize: 16,
      textAlign: 'center',
      width: '100%',

      '@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)': {
        fontSize: 20,
      },
    },

    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
      maxWidth: '90px',
      width: '100%',
    },

    button: {
      fontSize: 36,
      padding: 0,

      '@media (orientation: landscape)': {
        fontSize: 32,

        [theme.breakpoints.up('sm')]: {
          fontSize: 36,
        },
      },
    },

    icon: {
      fontSize: 'inherit',
    },

    value: {
      color: theme.palette.text.primary,
      fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
      fontSize: theme.typography.h4.fontSize,
      lineHeight: theme.typography.h4.lineHeight,
    },
  }),
  /* eslint-enable */
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

      <div className={classes.value}>{value}</div>

      <div className={classes.buttons}>
        <CounterButton
          className={classes.button}
          disabled={decrementDisabled}
          onClick={onDecrement}
        >
          <MenuDown className={classes.icon} />
        </CounterButton>

        <CounterButton
          className={classes.button}
          disabled={incrementDisabled}
          onClick={onIncrement}
        >
          <MenuUp className={classes.icon} />
        </CounterButton>
      </div>
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
