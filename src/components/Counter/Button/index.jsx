import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDrag } from 'react-use-gesture';

const displayName = 'CounterButton';

const touch = 'ontouchstart' in window;

const CounterButton = ({ onClick, ...rest }) => {
  const bind = useDrag(
    (state) => {
      const { tap } = state;

      if (tap) {
        onClick();
      }
    },
    {
      enabled: touch,
    },
  );

  return (
    <IconButton onClick={touch ? undefined : onClick} {...rest} {...bind()} />
  );
};

CounterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CounterButton.displayName = displayName;

export default CounterButton;
