import { css } from "@emotion/react";
import { useTheme } from "@material-ui/core";
import {
  MenuDown as DecrementIcon,
  MenuUp as IncrementIcon,
} from "mdi-material-ui";
import PropTypes from "prop-types";
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

const Counter = ({
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
          font-family: "Munchkin", ${theme.typography.fontFamily};
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
          <DecrementIcon
            css={css`
              font-size: inherit;
            `}
          />
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
          <IncrementIcon
            css={css`
              font-size: inherit;
            `}
          />
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
