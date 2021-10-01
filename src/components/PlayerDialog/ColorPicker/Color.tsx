import { css } from "@emotion/react";
import { mdiCheck } from "@mdi/js";
import { Avatar, ButtonBase, ButtonBaseProps, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

type ColorProps = Omit<ButtonBaseProps, "selected" | "value"> & {
  selected?: boolean;
  value?: string;
};

const Color = forwardRef<HTMLButtonElement, ColorProps>(function Color(
  { selected, value, ...props },
  ref
) {
  return (
    <ButtonBase
      ref={ref}
      centerRipple
      css={css`
        border-radius: 50%;
        height: 48px;
        padding: 0;
        width: 48px;
      `}
      focusRipple
      value={value}
      {...props}
    >
      <Avatar
        css={css`
          height: 36px;
          margin: 0 auto;
          width: 36px;
        `}
        style={{ backgroundColor: value }}
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
