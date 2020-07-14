import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag } from 'react-use-gesture';

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

  const bind = useDrag(
    (state) => {
      const { distance, event, first, last, tap } = state;

      if (first) {
        event.preventDefault();

        timeoutRef.current = setTimeout(() => {
          onClick();
          intervalRef.current = setInterval(() => onClick(), 250);
        }, 500);
      }

      if (tap) {
        if (!intervalRef.current && !disabled) {
          onClick();
        }
      }

      if (last || (distance >= 3 && !intervalRef.current)) {
        clearPress();
      }
    },
    {
      eventOptions: {
        passive: false,
      },
    },
  );

  const onKeyDown = ({ key }) => {
    if (key === ' ' || key === 'Enter') {
      onClick();
    }
  };

  return (
    <IconButton
      disabled={disabled}
      {...rest}
      onKeyDown={onKeyDown}
      {...bind()}
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
