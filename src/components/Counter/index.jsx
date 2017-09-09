import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import NavigationArrowDropDown from 'material-ui-icons/ArrowDropDown';
import NavigationArrowDropUp from 'material-ui-icons/ArrowDropUp';
import cns from 'classnames';

import { noop } from '../../constants';
import { classesObject } from '../../utils/propTypes';

const baseStyles = {
  small: {
    width: 64,
    height: 64,
    padding: 0,
  },
  smallIcon: {
    width: 64,
    height: 64,
  },
};

const compactStyles = {
  small: {
    width: 48,
    height: 48,
    padding: 0,
  },
  smallIcon: {
    width: 48,
    height: 48,
  },
};

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

  value: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 36,
  },
});

const Counter = ({ classes, className, compact, onDecrement, onIncrement, title, value }) => {
  const buttonStyle = compact ? compactStyles.small : baseStyles.small;
  const iconStyle = compact ? compactStyles.smallIcon : baseStyles.smallIcon;

  return (
    <div className={cns(className, classes.counter)}>
      {title ? (
        <div className={cns(classes.title, { [classes.compactTitle]: compact })}>{title}</div>
      ) : null}

      <IconButton
        color="inherit"
        onClick={onIncrement}
        style={buttonStyle}
      >
        <NavigationArrowDropUp style={iconStyle} />
      </IconButton>

      <div className={classes.value}>
        {value}
      </div>

      <IconButton
        color="inherit"
        onClick={onDecrement}
        style={buttonStyle}
      >
        <NavigationArrowDropDown style={iconStyle} />
      </IconButton>
    </div>
  );
};

Counter.propTypes = {
  classes: classesObject.isRequired,
  className: PropTypes.string,
  compact: PropTypes.bool,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  title: PropTypes.node,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  className: '',
  compact: false,
  onDecrement: noop,
  onIncrement: noop,
  title: '',
};

export default withStyles(styles)(Counter);
