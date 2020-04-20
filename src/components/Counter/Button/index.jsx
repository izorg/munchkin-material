import { IconButton } from '@material-ui/core';
import Hammer from 'hammerjs';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const displayName = 'CounterButton';

const CounterButton = ({ onClick, ...rest }) => {
  const hammerRef = useRef(null);
  const buttonRef = useRef(null);

  // const pressIntervalRef = useRef(null);

  // const onPress = useCallback(() => {
  //   onClick();
  //
  //   pressIntervalRef.current = setInterval(() => {
  //     onClick();
  //   }, 250);
  // }, [onClick]);

  // const onPressUp = useCallback(() => {
  //   if (pressIntervalRef.current) {
  //     clearInterval(pressIntervalRef.current);
  //
  //     pressIntervalRef.current = null;
  //   }
  // }, []);

  useEffect(() => {
    hammerRef.current = new Hammer(buttonRef.current, {
      inputClass: Hammer.TouchMouseInput, // https://github.com/hammerjs/hammer.js/issues/1084#issuecomment-544220158
      recognizers: [[Hammer.Tap]], // [Hammer.Press], [Hammer.Pan]],
    });

    return () => {
      // onPressUp();

      hammerRef.current.stop();
      hammerRef.current.destroy();

      hammerRef.current = null;
    };
  }, []);

  useEffect(() => {
    hammerRef.current.on('tap', onClick);
    // hammerRef.current.on('press', onPress);
    // hammerRef.current.on('pressup', onPressUp);
    // hammerRef.current.on('pan', onPressUp);

    return () => {
      if (hammerRef.current) {
        hammerRef.current.off('tap', onClick);
        // hammerRef.current.off('press', onPress);
        // hammerRef.current.off('pressup', onPressUp);
        // hammerRef.current.off('pan', onPressUp);

        // onPressUp();
      }
    };
  }, [onClick]);

  return <IconButton ref={buttonRef} {...rest} />;
};

CounterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CounterButton.displayName = displayName;

export default CounterButton;
