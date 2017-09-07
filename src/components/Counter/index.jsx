import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import cns from 'classnames';

import { noop } from '../../constants';

import cn from './style.css';

const styles = {
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

const Counter = ({ className, compact, onDecrement, onIncrement, title, value }) => {
  const buttonStyle = compact ? compactStyles.small : styles.small;
  const iconStyle = compact ? compactStyles.smallIcon : styles.smallIcon;

  return (
    <div className={cns(className, cn.counter, { [cn.compact]: compact })}>
      {title ? <div className={cn.title}>{title}</div> : null}

      <IconButton
        iconStyle={iconStyle}
        onClick={onIncrement}
        style={buttonStyle}
      >
        <NavigationArrowDropUp />
      </IconButton>

      <div className={cn.value}>
        {value}
      </div>

      <IconButton
        iconStyle={iconStyle}
        onClick={onDecrement}
        style={buttonStyle}
      >
        <NavigationArrowDropDown />
      </IconButton>
    </div>
  );
};

Counter.propTypes = {
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

export default Counter;
