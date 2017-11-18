import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/es/IconButton';
import { withStyles } from 'material-ui/es/styles';
import NavigationArrowDropDown from 'material-ui-icons/ArrowDropDown';
import NavigationArrowDropUp from 'material-ui-icons/ArrowDropUp';
import cns from 'classnames';

import { noop } from '../../constants';
import { classesObject } from '../../utils/propTypes';

const styles = theme => ({
  counter: {
    textAlign: 'center',
  },

  title: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  compactTitle: {
    fontSize: 16,
  },

  button: {
    fontSize: 64,
    height: 64,
    width: 64,
  },

  compactButton: {
    fontSize: 48,
    height: 48,
    width: 48,
  },

  value: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 36,
  },
});

const Counter = ({
  classes, className, compact, onDecrement, onIncrement, title, value,
}) => (
  <div className={cns(className, classes.counter)}>
    <div className={cns(classes.title, { [classes.compactTitle]: compact })}>
      {title}
    </div>

    <IconButton
      className={cns(classes.button, { [classes.compactButton]: compact })}
      color="inherit"
      onClick={onIncrement}
    >
      <NavigationArrowDropUp />
    </IconButton>

    <div className={classes.value}>
      {value}
    </div>

    <IconButton
      className={cns(classes.button, { [classes.compactButton]: compact })}
      color="inherit"
      onClick={onDecrement}
    >
      <NavigationArrowDropDown />
    </IconButton>
  </div>
);

Counter.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  compact: PropTypes.bool,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  className: '',
  compact: false,
  onDecrement: noop,
  onIncrement: noop,
};

export default withStyles(styles)(Counter);
