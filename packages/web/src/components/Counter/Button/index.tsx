import { IconButton, type IconButtonProps } from "@mui/material";
import { usePress } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { captureMessage } from "@sentry/react";
import { type FC, useEffect, useRef } from "react";

const PRESS_HOLD_TIMEOUT = 500;
const PRESS_HOLD_INTERVAL = 250;

type CounterButtonProps = {
  onClick: () => void;
} & Omit<IconButtonProps, "onClick">;

const CounterButton: FC<CounterButtonProps> = ({
  disabled = false,
  onClick,
  ...rest
}) => {
  const timeoutRef = useRef(0);
  const intervalRef = useRef(0);
  const skipRef = useRef(false);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        captureMessage("Long press clean up on unmount");
      }
    };
  }, []);

  const { pressProps } = usePress({
    isDisabled: disabled,
    onPress: () => {
      if (!skipRef.current) {
        onClick();
      }
    },
    onPressEnd: () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = 0;
      }

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = 0;
      }
    },
    onPressStart: () => {
      skipRef.current = false;

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = 0;

        onClick();

        intervalRef.current = window.setInterval(() => {
          skipRef.current = true;

          onClick();
        }, PRESS_HOLD_INTERVAL);
      }, PRESS_HOLD_TIMEOUT);
    },
  });

  return <IconButton disabled={disabled} {...mergeProps(rest, pressProps)} />;
};

export default CounterButton;
