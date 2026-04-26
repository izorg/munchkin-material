import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import {
  Box,
  type BoxProps,
  IconButton,
  SvgIcon,
  type SxProps,
  type Theme,
  useMediaQuery,
} from "@mui/material";
import { usePress } from "@react-aria/interactions";
import { type SpinButtonProps, useSpinButton } from "@react-aria/spinbutton";
import { type FC } from "react";
import { FormattedNumber } from "react-intl";

import CounterLabel from "../../Counter/Label";

const buttonSx: SxProps<Theme> = [
  {
    fontSize: "2.25rem",
    padding: 0,
  },
  {
    "@media (orientation: landscape)": {
      fontSize: {
        sm: "2.25rem",
        xs: "2rem",
      },
    },
  },
];

type CombatCounterProps = {
  onDecrement: () => void;
  onIncrement: () => void;
  title: string;
  value: number;
} & BoxProps &
  Pick<SpinButtonProps, "maxValue" | "minValue">;

const CombatCounter: FC<CombatCounterProps> = (props) => {
  const {
    maxValue,
    minValue,
    onDecrement,
    onIncrement,
    sx = [],
    title,
    value,
    ...rest
  } = props;

  const { decrementButtonProps, incrementButtonProps, spinButtonProps } =
    useSpinButton({
      maxValue,
      minValue,
      onDecrement,
      onIncrement,
      value,
    });

  const decrementDisabled = minValue !== undefined && value <= minValue;

  const { pressProps: decrementButtonPressProps } = usePress({
    ...decrementButtonProps,
    isDisabled: decrementDisabled,
  });

  const incrementDisabled = maxValue !== undefined && value >= maxValue;

  const { pressProps: incrementButtonPressProps } = usePress({
    ...incrementButtonProps,
    isDisabled: incrementDisabled,
  });

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
        ...[sx].flat(),
      ]}
    >
      <CounterLabel
        sx={{
          fontSize: useMediaQuery(
            "@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)",
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
        {...spinButtonProps}
        sx={(theme) => ({
          fontFamily: `Munchkin, ${theme.typography.fontFamily ?? ""}`,
          fontSize: theme.typography.h4.fontSize,
          lineHeight: theme.typography.h4.lineHeight,
        })}
      >
        <FormattedNumber value={value} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "90px",
          width: "100%",
        }}
      >
        <IconButton
          {...decrementButtonPressProps}
          disabled={decrementDisabled}
          sx={buttonSx}
        >
          <SvgIcon sx={iconSx}>
            <path d={mdiMenuDown} />
          </SvgIcon>
        </IconButton>

        <IconButton
          {...incrementButtonPressProps}
          disabled={incrementDisabled}
          sx={buttonSx}
        >
          <SvgIcon sx={iconSx}>
            <path d={mdiMenuUp} />
          </SvgIcon>
        </IconButton>
      </Box>
    </Box>
  );
};

export default CombatCounter;
