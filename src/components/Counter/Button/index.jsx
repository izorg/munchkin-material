import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag } from 'react-use-gesture';

const displayName = 'CounterButton';

const CounterButton = (props) => {
  const { disabled, onClick: onClickProp } = props;

  const timeoutRef = useRef(0);
  const intervalRef = useRef(0);
  const ignoreClickRef = useRef(false);

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

  const onClick = () => {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
    } else {
      onClickProp();
    }
  };

  const bind = useDrag((state) => {
    const { first, tap } = state;

    if (first) {
      ignoreClickRef.current = false;

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => onClickProp(), 250);
      }, 500);
    }

    if (tap) {
      ignoreClickRef.current = true;

      if (!intervalRef.current && !disabled) {
        onClickProp();
      }
    }

    if (!first) {
      clearPress();
    }
  });

  return <IconButton {...props} {...bind()} onClick={onClick} />;
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
