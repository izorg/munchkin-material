import {
  Dialog,
  DialogContent,
  type DialogProps,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import availableColors, {
  type AvailableColor,
} from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";

type ColorPickerDialogProps = Omit<DialogProps, "onSelect" | "value"> & {
  onSelect: (color: AvailableColor) => void;
  value?: AvailableColor;
};

const ColorPickerDialog: FC<ColorPickerDialogProps> = ({
  onSelect,
  value,
  ...props
}) => (
  <Dialog {...props}>
    <DialogTitle>
      <FormattedMessage
        defaultMessage="Choose color"
        id="colorPicker.dialog.title"
      />
    </DialogTitle>
    <DialogContent
      sx={(theme) => ({
        padding: theme.spacing(0, 1, 2),
        textAlign: "center",
      })}
    >
      {availableColors.map((color) => (
        <Color
          key={color}
          onClick={() => onSelect(color)}
          selected={value === color}
          value={color}
        />
      ))}
    </DialogContent>
  </Dialog>
);

ColorPickerDialog.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType,
};

export default ColorPickerDialog;
