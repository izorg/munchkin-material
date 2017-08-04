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
    padding: 12,
  },
  smallIcon: {
    width: 36,
    height: 36,
  },
};

const Counter = ({ className, onDecrement, onIncrement, title, value }) => (
  <div className={cns(className, cn.counter)}>
    {title ? <div className={cn.title}>{title}</div> : null}

    <IconButton
      iconStyle={styles.smallIcon}
      onTouchTap={onIncrement}
      style={styles.small}
    >
      <NavigationArrowDropUp className={cn.actionIcon} />
    </IconButton>

    <div className={cn.value}>
      {value}
    </div>

    <IconButton
      iconStyle={styles.smallIcon}
      onTouchTap={onDecrement}
      style={styles.small}
    >
      <NavigationArrowDropDown className={cn.actionIcon} />
    </IconButton>
  </div>
);

Counter.propTypes = {
  className: PropTypes.string,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  title: PropTypes.node,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  className: '',
  onDecrement: noop,
  onIncrement: noop,
  title: '',
};

export default Counter;
