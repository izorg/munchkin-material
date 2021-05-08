import { css } from "@emotion/react";
import { Avatar, ButtonBase, ButtonBaseProps } from "@material-ui/core";
import { Check } from "mdi-material-ui";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const displayName = "Color";

type ColorProps = Omit<ButtonBaseProps, "selected" | "value"> & {
  selected?: boolean;
  value?: string;
};

const Color = forwardRef<HTMLButtonElement, ColorProps>(
  ({ selected, value, ...props }, ref) => (
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
        {selected && <Check />}
      </Avatar>
    </ButtonBase>
  )
);

Color.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string,
};

Color.defaultProps = {
  selected: false,
};

Color.displayName = displayName;

export default Color;
