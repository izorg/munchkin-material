import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import Hammer from 'hammerjs';

const CounterButton = ({ onClick, ...rest }) => {
  const buttonRef = useRef();

  useEffect(() => {
    if (!onClick) {
      return undefined;
    }

    let hammer = new Hammer(buttonRef.current, {
      recognizers: [[Hammer.Tap]],
    });

    hammer.on('tap', onClick);

    return () => {
      hammer.stop();
      hammer.destroy();

      hammer = null;
    };
  }, [onClick]);

  return <IconButton ref={buttonRef} {...rest} />;
};

CounterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CounterButton.displayName = 'CounterButton';

export default CounterButton;
