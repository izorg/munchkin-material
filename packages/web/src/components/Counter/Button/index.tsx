import { IconButton, type IconButtonProps } from "@mui/material";
import { captureException } from "@sentry/react";
import { m } from "framer-motion";
import PropTypes from "prop-types";
import { type FC, useCallback, useEffect, useRef } from "react";

const PRESS_HOLD_TIMEOUT = 500;
const PRESS_HOLD_INTERVAL = 250;

type CounterButtonProps = {
  onClick: () => void;
} & Omit<IconButtonProps<typeof m.button>, "onClick">;

const CounterButton: FC<CounterButtonProps> = ({
  disabled = false,
  onClick,
  ...rest
}) => {
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

  // clear timeout on unmount
  useEffect(
    () => () => {
      clearPress();
    },
    [clearPress],
  );

  useEffect(() => {
    if (disabled) {
      clearPress();
    }
  }, [clearPress, disabled]);

  const onTapStart = useCallback(() => {
    clearPress();

    timeoutRef.current = window.setTimeout(() => {
      try {
        onClick();
      } catch (error) {
        captureException(error);
      }

      intervalRef.current = window.setInterval(() => {
        try {
          onClick();
        } catch (error) {
          captureException(error);

          clearPress();
        }
      }, PRESS_HOLD_INTERVAL);
    }, PRESS_HOLD_TIMEOUT);
  }, [clearPress, onClick]);

  const onTap = useCallback(() => {
    clearPress();

    onClick();
  }, [clearPress, onClick]);

  const onPanStart = useCallback(() => {
    clearPress();
  }, [clearPress]);

  const onTapCancel = useCallback(() => {
    clearPress();
  }, [clearPress]);

  return (
    <IconButton
      component={m.button}
      disabled={disabled}
      {...rest}
      onPanStart={onPanStart} // cover mouse drag action
      onTap={onTap}
      onTapCancel={onTapCancel}
      onTapStart={onTapStart}
    />
  );
};

CounterButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CounterButton;
