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

type ColorPickerDialogProps = {
  onSelect: (color: AvailableColor) => void;
  value?: AvailableColor;
} & Omit<DialogProps, "onSelect" | "value">;

const ColorPickerDialog: FC<ColorPickerDialogProps> = ({
  onClose,
  onSelect,
  value,
  ...props
}) => (
  <Dialog onClose={onClose} {...props}>
    <DialogTitle>
      {/* eslint-disable-next-line formatjs/enforce-id */}
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
