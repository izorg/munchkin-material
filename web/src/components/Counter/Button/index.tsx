import { IconButton, type IconButtonProps } from "@mui/material";
import { m, type TapInfo } from "framer-motion";
import PropTypes from "prop-types";
import { type FC, useCallback, useEffect, useRef } from "react";

type CounterButtonProps = Omit<IconButtonProps<typeof m.button>, "onClick"> & {
  onClick: () => void;
};

const CounterButton: FC<CounterButtonProps> = ({
  disabled = false,
  onClick,
  ...rest
}) => {
  const timeoutRef = useRef(0);
  const intervalRef = useRef(0);

  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

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

  const startPointRef = useRef({ x: 0, y: 0 });

  const onTapStart = (event: PointerEvent, info: TapInfo) => {
    startPointRef.current = info.point;

    timeoutRef.current = window.setTimeout(() => {
      onClick();

      intervalRef.current = window.setInterval(() => {
        onClick();
      }, 250);
    }, 500);
  };

  const onTap = (event: PointerEvent, info: TapInfo) => {
    clearPress();

    if (event.type === "pointercancel") {
      return;
    }

    const delta = Math.sqrt(
      Math.pow(info.point.x - startPointRef.current.x, 2) +
        Math.pow(info.point.y - startPointRef.current.y, 2)
    );

    if (delta > 3) {
      return;
    }

    if (!intervalRef.current && !disabledRef.current) {
      onClick();
    }
  };

  return (
    <IconButton
      component={m.button}
      disabled={disabled}
      {...rest}
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

export default CounterButton;
