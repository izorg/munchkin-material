import { Popover, type PopoverProps } from "@mui/material";
import { type FC } from "react";

import { useInitialAppear } from "../../../domains/ui";
import availableColors, {
  type AvailableColor,
} from "../../../utils/availableColors";

import Color from "./Color";

type ColorPickerPopoverProps = {
  onSelect: (color: AvailableColor) => void;
  value?: AvailableColor;
} & Omit<PopoverProps, "onSelect">;

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
      transition: {
        appear: useInitialAppear(),
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

export default ColorPickerPopover;
