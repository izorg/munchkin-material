import { Popover, type PopoverProps } from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";

import availableColors, {
  type AvailableColor,
} from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";

type ColorPickerPopoverProps = Omit<PopoverProps, "onSelect"> & {
  onSelect: (color: AvailableColor) => void;
  value?: AvailableColor;
};

const ColorPickerPopover: FC<ColorPickerPopoverProps> = ({
  onSelect,
  value,
  ...props
}) => (
  <Popover
    slotProps={{
      paper: {
        sx: {
          maxWidth: 288,
        },
      },
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
);

ColorPickerPopover.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType,
};

export default ColorPickerPopover;
