import { IconButton } from '@material-ui/core';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';

const displayName = 'CounterButton';

const CounterButton = ({ disabled, onClick, ...rest }) => {
  const timeoutRef = useRef(0);
  const intervalRef = useRef(0);

  const clearPress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = 0;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);

      intervalRef.current = 0;
    }
  }, []);

  useEffect(() => () => clearPress(), [clearPress]);

  useEffect(() => {
    if (disabled) {
      clearPress();
    }
  }, [clearPress, disabled]);

  const startPointRef = useRef({ x: 0, y: 0 });

  const onTapStart = (event, info) => {
    startPointRef.current = info.point;

    timeoutRef.current = setTimeout(() => {
      onClick();
      intervalRef.current = setInterval(() => onClick(), 250);
    }, 500);
  };

  const onTap = (event, info) => {
    clearPress();

    if (event.type === 'pointercancel') {
      return;
    }

    const delta = Math.sqrt(
      Math.pow(info.point.x - startPointRef.current.x, 2) +
        Math.pow(info.point.y - startPointRef.current.y, 2),
    );

    if (delta > 3) {
      return;
    }

    if (!intervalRef.current && !disabled) {
      onClick();
    }
  };

  const onKeyDown = ({ key }) => {
    if (key === ' ' || key === 'Enter') {
      onClick();
    }
  };

  return (
    <IconButton
      component={motion.button}
      disabled={disabled}
      {...rest}
      onKeyDown={onKeyDown}
      onPanStart={clearPress}
      onTap={onTap}
      onTapCancel={clearPress}
      onTapStart={onTapStart}
    />
  );
};

CounterButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CounterButton.defaultProps = {
  disabled: false,
};

CounterButton.displayName = displayName;

export default CounterButton;
