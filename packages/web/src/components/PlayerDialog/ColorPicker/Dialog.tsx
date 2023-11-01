import {
  Dialog,
  DialogActions,
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
import CancelButton from "../../CancelButton";

import Color from "./Color";

type ColorPickerDialogProps = Omit<DialogProps, "onSelect" | "value"> & {
  onSelect: (color: AvailableColor) => void;
  value?: AvailableColor;
};

const ColorPickerDialog: FC<ColorPickerDialogProps> = ({
  onClose,
  onSelect,
  value,
  ...props
}) => (
  <Dialog onClose={onClose} {...props}>
    <DialogTitle>
      <FormattedMessage
        defaultMessage="Choose color"
        id="colorPicker.dialog.title"
      />
    </DialogTitle>
    <DialogContent
      sx={{
        textAlign: "center",
      }}
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
    <DialogActions>
      <CancelButton onClick={(event) => onClose?.(event, "escapeKeyDown")} />
    </DialogActions>
  </Dialog>
);

ColorPickerDialog.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType,
};

export default ColorPickerDialog;
