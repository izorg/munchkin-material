import {
  mdiMenuDown as decrementIcon,
  mdiMenuUp as incrementIcon,
} from "@mdi/js";
import { Box, SvgIcon, type Theme } from "@mui/material";
import PropTypes from "prop-types";
import { type HTMLAttributes, type ReactNode, type VFC } from "react";
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

const Counter: VFC<CounterProps> = ({
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
  ...props
}) => {
  return (
    <Box
      className={className}
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
      {...props}
    >
      <CounterLabel
        sx={{
          fontSize: "24px",
          textAlign: "center",
          width: "100%",
        }}
      >
        {title}
      </CounterLabel>

      <Box
        sx={{
          color: "text.primary",
          fontFamily: (theme: Theme) =>
            `Munchkin, ${String(theme.typography.fontFamily)}`,
          fontSize: "36px",
        }}
      >
        {value}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "120px",
          width: "100%",
        }}
      >
        <Button
          data-screenshots="decrement-button"
          disabled={decrementDisabled}
          onClick={onDecrement}
          sx={{
            fontSize: "48px",
            padding: 0,
          }}
        >
          <SvgIcon
            sx={{
              fontSize: "inherit",
            }}
          >
            <path d={decrementIcon} />
          </SvgIcon>
        </Button>

        <Button
          data-screenshots="increment-button"
          disabled={incrementDisabled}
          onClick={onIncrement}
          sx={{
            fontSize: "48px",
            padding: 0,
          }}
        >
          <SvgIcon
            sx={{
              fontSize: "inherit",
            }}
          >
            <path d={incrementIcon} />
          </SvgIcon>
        </Button>
      </Box>
    </Box>
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
