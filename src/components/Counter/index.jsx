import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import NavigationArrowDropDown from '@material-ui/icons/ArrowDropDown';
import NavigationArrowDropUp from '@material-ui/icons/ArrowDropUp';
import cns from 'classnames';
import { noop } from 'lodash';

const styles = (theme) => ({
  counter: {
    textAlign: 'center',
  },

  title: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  button: {
    fontSize: 64,
    height: 64,
    width: 64,
  },

  value: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 36,
  },
});

const Counter = ({
  classes,
  className,
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
      color="inherit"
      data-screenshots="increment-button"
      onClick={onIncrement}
    >
      <NavigationArrowDropUp />
    </IconButton>

    <div className={classes.value}>{value}</div>

    <IconButton
      className={classes.button}
      color="inherit"
      data-screenshots="decrement-button"
      onClick={onDecrement}
    >
      <NavigationArrowDropDown />
    </IconButton>
  </div>
);

Counter.propTypes = {
  className: PropTypes.string,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  className: '',
  onDecrement: noop,
  onIncrement: noop,
};

export default withStyles(styles)(Counter);
