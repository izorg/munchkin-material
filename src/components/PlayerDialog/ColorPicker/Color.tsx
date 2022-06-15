import { mdiCheck } from "@mdi/js";
import {
  Avatar,
  ButtonBase,
  type ButtonBaseProps,
  SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

type ColorProps = Omit<ButtonBaseProps, "selected" | "value"> & {
  selected?: boolean;
  value?: string;
};

const Color = forwardRef<HTMLButtonElement, ColorProps>(function Color(
  props,
  ref
) {
  const { selected, sx = [], value, ...rest } = props;

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
        style={{ backgroundColor: value }}
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
  value: PropTypes.string,
};

Color.defaultProps = {
  selected: false,
};

export default Color;
