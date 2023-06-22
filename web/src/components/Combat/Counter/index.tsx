import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import {
  Box,
  type BoxProps,
  SvgIcon,
  type SxProps,
  type Theme,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";

import CounterButton from "../../Counter/Button";
import CounterLabel from "../../Counter/Label";

const buttonSx: SxProps<Theme> = [
  {
    fontSize: "36px",
    padding: 0,
  },
  {
    "@media (orientation: landscape)": {
      fontSize: {
        sm: "36px",
        xs: "32px",
      },
    },
  },
];

type CombatCounterProps = {
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  title: string;
  value: number;
} & BoxProps;

const CombatCounter: FC<CombatCounterProps> = (props) => {
  const {
    decrementDisabled = false,
    incrementDisabled = false,
    onDecrement,
    onIncrement,
    sx = [],
    title,
    value,
    ...rest
  } = props;

  const iconSx: SxProps = {
    fontSize: "inherit",
  };

  return (
    <Box
      {...rest}
      sx={[
        {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      <CounterLabel
        sx={{
          fontSize: useMediaQuery(
            "@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)"
          )
            ? "20px"
            : "16px",
          textAlign: "center",
          width: "100%",
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
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CombatCounter;
