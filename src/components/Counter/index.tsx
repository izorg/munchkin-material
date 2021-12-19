import { css } from "@emotion/react";
import {
  mdiMenuDown as decrementIcon,
  mdiMenuUp as incrementIcon,
} from "@mdi/js";
import { SvgIcon, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { type FC, type HTMLAttributes, type ReactNode } from "react";
import { defineMessages } from "react-intl";

import Button from "./Button";
import CounterLabel from "./Label";

export const counterMessages = defineMessages({
  gear: {
    defaultMessage: "Gear",
    id: "counter.gear",
  },
  level: {
    defaultMessage: "Level",
    id: "counter.level",
  },
  modifier: {
    defaultMessage: "Modifier",
    id: "counter.modifier",
  },
  strength: {
    defaultMessage: "Strength",
    id: "counter.strength",
  },
});

type CounterProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  title: ReactNode;
  value: number;
};

const Counter: FC<CounterProps> = ({
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
  ...props
}) => {
  const theme = useTheme();

  return (
    <div
      className={className}
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
      `}
      {...props}
    >
      <CounterLabel
        css={css`
          font-size: 24px;
          text-align: center;
          width: 100%;
        `}
      >
        {title}
      </CounterLabel>

      <div
        css={css`
          color: ${theme.palette.text.primary};
          font-family: Munchkin, ${theme.typography.fontFamily};
          font-size: 36px;
        `}
      >
        {value}
      </div>

      <div
        css={css`
          display: flex;
          justify-content: space-around;
          max-width: 120px;
          width: 100%;
        `}
      >
        <Button
          css={css`
            font-size: 48px;
            padding: 0;
          `}
          data-screenshots="decrement-button"
          disabled={decrementDisabled}
          onClick={onDecrement}
        >
          <SvgIcon
            css={css`
              font-size: inherit;
            `}
          >
            <path d={decrementIcon} />
          </SvgIcon>
        </Button>

        <Button
          css={css`
            font-size: 48px;
            padding: 0;
          `}
          data-screenshots="increment-button"
          disabled={incrementDisabled}
          onClick={onIncrement}
        >
          <SvgIcon
            css={css`
              font-size: inherit;
            `}
          >
            <path d={incrementIcon} />
          </SvgIcon>
        </Button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  className: PropTypes.string,
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

Counter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
};

export default Counter;
