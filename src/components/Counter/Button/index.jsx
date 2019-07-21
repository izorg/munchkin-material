import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import Hammer from 'hammerjs';

const CounterButton = ({ onClick, ...rest }) => {
  const hammerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    hammerRef.current = new Hammer(buttonRef.current, {
      recognizers: [[Hammer.Tap]],
    });

    return () => {
      hammerRef.current.stop();
      hammerRef.current.destroy();

      hammerRef.current = null;
    };
  }, []);

  useEffect(() => {
    hammerRef.current.on('tap', onClick);

    return () => hammerRef.current && hammerRef.current.off('tap', onClick);
  }, [onClick]);

  return <IconButton ref={buttonRef} {...rest} />;
};

CounterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CounterButton.displayName = 'CounterButton';

export default CounterButton;
