import {
  mdiMenuDown as decrementIcon,
  mdiMenuUp as incrementIcon,
} from "@mdi/js";
import { Box, type BoxProps, SvgIcon, type Theme } from "@mui/material";
import { type FC, type ReactNode } from "react";
import { defineMessages, FormattedNumber } from "react-intl";

import CounterButton from "./Button";
import CounterLabel from "./Label";

// eslint-disable-next-line formatjs/enforce-id
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

type CounterProps = {
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  title: ReactNode;
  value: number;
} & Omit<BoxProps, "title">;

const Counter: FC<CounterProps> = ({
  decrementDisabled = false,
  incrementDisabled = false,
  onDecrement,
  onIncrement,
  sx = [],
  title,
  value,
  ...props
}) => {
  return (
    <Box
      sx={[
        {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...props}
    >
      <CounterLabel
        sx={{
          fontSize: "1.5rem",
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
          fontSize: "2.25rem",
        }}
      >
        <FormattedNumber value={value} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "120px",
        }}
      >
        <CounterButton
          data-screenshots="decrement-button"
          disabled={decrementDisabled}
          onClick={onDecrement}
          sx={{
            fontSize: "3rem",
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
        </CounterButton>

        <CounterButton
          data-screenshots="increment-button"
          disabled={incrementDisabled}
          onClick={onIncrement}
          sx={{
            fontSize: "3rem",
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
        </CounterButton>
      </Box>
    </Box>
  );
};

export default Counter;
