import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import NavigationArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import cns from 'classnames';

import cn from './style.css';

import { noop } from '../../constants';

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

const Counter = ({ className, onDecrement, onIncrement, readOnly, title, value }) => (
  <div className={cns(className, cn.counter)}>
    {title ? <div className={cn.title}>{title}</div> : null}

    <IconButton
      className={cns({ [cn.hidden]: readOnly })}
      iconStyle={styles.smallIcon}
      onTouchTap={onIncrement}
      style={styles.small}
    >
      <NavigationArrowDropUp className={cn.actionIcon} />
    </IconButton>

    <div className={cns(cn.value, { [cn.valueReadOnly]: readOnly })}>
      {value}
    </div>

    <IconButton
      className={cns({ [cn.hidden]: readOnly })}
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
  readOnly: PropTypes.bool,
  title: PropTypes.node,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  className: '',
  onDecrement: noop,
  onIncrement: noop,
  readOnly: false,
  title: '',
};

export default Counter;
