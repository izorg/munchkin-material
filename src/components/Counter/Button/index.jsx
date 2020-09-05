import { IconButton } from '@material-ui/core';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';

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

  const onTapStart = () => {
    timeoutRef.current = setTimeout(() => {
      onClick();
      intervalRef.current = setInterval(() => onClick(), 250);
    }, 500);
  };

  const onTap = () => {
    if (!intervalRef.current && !disabled) {
      onClick();
    }

    clearPress();
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
