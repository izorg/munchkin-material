import { ClassNames } from "@emotion/react";
import { Popover, type PopoverProps } from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";

import availableColors from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";

type ColorPickerPopoverProps = Omit<PopoverProps, "onSelect"> & {
  onSelect: (color: string) => void;
  value?: string;
};

const ColorPickerPopover: FC<ColorPickerPopoverProps> = ({
  onSelect,
  value,
  ...props
}) => (
  <ClassNames>
    {({ css }) => (
      <Popover
        classes={{
          paper: css`
            max-width: 288px; /* 6 * 48 = 288 */
          `,
        }}
        {...props}
      >
        {availableColors.map((color) => (
          <Color
            key={color}
            onClick={() => onSelect(color)}
            selected={value === color}
            value={color}
          />
        ))}
      </Popover>
    )}
  </ClassNames>
);

ColorPickerPopover.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType,
};

export default ColorPickerPopover;
