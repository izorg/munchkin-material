import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { Box, SvgIcon, type Theme } from "@mui/material";
import { type SxProps } from "@mui/system";
import PropTypes from "prop-types";
import { type ReactNode } from "react";

import CounterButton from "../../../components/Counter/Button";
import CounterLabel from "../../../components/Counter/Label";

type CombatCounterProps = {
  className?: string;
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  title: ReactNode;
  value: number;
};

const CombatCounter = (props: CombatCounterProps) => {
  const {
    className,
    decrementDisabled,
    incrementDisabled,
    onDecrement,
    onIncrement,
    title,
    value,
  } = props;

  const buttonSx: SxProps<Theme> = (theme) => ({
    fontSize: "36px",
    padding: 0,

    // eslint-disable-next-line sort-keys
    "@media (orientation: landscape)": {
      fontSize: "32px",

      [theme.breakpoints.up("sm")]: {
        fontSize: "36px",
      },
    },
  });

  const iconSx: SxProps = {
    fontSize: "inherit",
  };

  return (
    <Box
      className={className}
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CounterLabel
        sx={{
          fontSize: "16px",
          textAlign: "center",
          width: "100%",

          // eslint-disable-next-line sort-keys
          "@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)":
            {
              fontSize: "20px",
            },
        }}
      >
        {title}
      </CounterLabel>

      <Box
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontFamily: `Munchkin, ${theme.typography.fontFamily ?? ""}`,
          fontSize: theme.typography.h4.fontSize,
          lineHeight: theme.typography.h4.lineHeight,
        })}
      >
        {value}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "90px",
          width: "100%",
        }}
      >
        <CounterButton
          disabled={decrementDisabled}
          onClick={onDecrement}
          sx={buttonSx}
        >
          <SvgIcon sx={iconSx}>
            <path d={mdiMenuDown} />
          </SvgIcon>
        </CounterButton>

        <CounterButton
          disabled={incrementDisabled}
          onClick={onIncrement}
          sx={buttonSx}
        >
          <SvgIcon sx={iconSx}>
            <path d={mdiMenuUp} />
          </SvgIcon>
        </CounterButton>
      </Box>
    </Box>
  );
};

CombatCounter.propTypes = {
  className: PropTypes.string,
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

CombatCounter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
};

export default CombatCounter;
