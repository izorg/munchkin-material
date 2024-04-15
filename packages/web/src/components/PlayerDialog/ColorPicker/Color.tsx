import { mdiCheck } from "@mdi/js";
import {
  Avatar,
  ButtonBase,
  type ButtonBaseProps,
  colors,
  SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import { type AvailableColor } from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

type ColorProps = {
  selected?: boolean;
  value?: AvailableColor;
} & Omit<ButtonBaseProps, "selected" | "value">;

const Color = forwardRef<HTMLButtonElement, ColorProps>(
  function Color(props, ref) {
    const { selected = false, sx = [], value, ...rest } = props;

    return (
      <ButtonBase
        centerRipple
        focusRipple
        ref={ref}
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
          component="span"
          sx={(theme) => ({
            backgroundColor:
              value && colors[value][theme.palette.mode === "dark" ? 200 : 500],
            height: "36px",
            margin: "0 auto",
            width: "36px",
          })}
        >
          {selected ? (
            <SvgIcon>
              <path d={mdiCheck} />
            </SvgIcon>
          ) : (
            <></>
          )}
        </Avatar>
      </ButtonBase>
    );
  },
);

Color.propTypes = {
  selected: PropTypes.bool,
  value: colorType,
};

export default Color;
