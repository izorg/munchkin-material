import { mdiCheck } from "@mdi/js";
import {
  Avatar,
  ButtonBase,
  type ButtonBaseProps,
  colors,
  SvgIcon,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import { type AvailableColor } from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

type ColorProps = Omit<ButtonBaseProps, "selected" | "value"> & {
  selected?: boolean;
  value?: AvailableColor;
};

const Color = forwardRef<HTMLButtonElement, ColorProps>(function Color(
  props,
  ref
) {
  const theme = useTheme();

  const { selected = false, sx = [], value, ...rest } = props;

  const backgroundColor =
    value && value in colors
      ? colors[value][theme.palette.mode === "dark" ? 200 : 500]
      : value;

  return (
    <ButtonBase
      ref={ref}
      centerRipple
      focusRipple
      sx={[
        {
          borderRadius: "50%",
          height: "48px",
          padding: 0,
          width: "48px",
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      value={value}
      {...rest}
    >
      <Avatar
        style={{ backgroundColor }}
        sx={{
          height: "36px",
          margin: "0 auto",
          width: "36px",
        }}
      >
        {selected && (
          <SvgIcon>
            <path d={mdiCheck} />
          </SvgIcon>
        )}
      </Avatar>
    </ButtonBase>
  );
});

Color.propTypes = {
  selected: PropTypes.bool,
  value: colorType,
};

export default Color;
