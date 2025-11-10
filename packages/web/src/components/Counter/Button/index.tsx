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
  const timeoutRef =
    useRef<ReturnType<typeof globalThis.setTimeout>>(undefined);
  const intervalRef =
    useRef<ReturnType<typeof globalThis.setInterval>>(undefined);
  const skipRef = useRef(false);

  useEffect(() => {
    if (disabled) {
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      if (intervalRef.current) {
        globalThis.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        globalThis.clearInterval(intervalRef.current);
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
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      if (intervalRef.current) {
        globalThis.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    },
    onPressStart: () => {
      skipRef.current = false;

      timeoutRef.current = globalThis.setTimeout(() => {
        timeoutRef.current = undefined;

        onClick();

        intervalRef.current = globalThis.setInterval(() => {
          skipRef.current = true;

          onClick();
        }, PRESS_HOLD_INTERVAL);
      }, PRESS_HOLD_TIMEOUT);
    },
  });

  return <IconButton disabled={disabled} {...mergeProps(rest, pressProps)} />;
};

export default CounterButton;
