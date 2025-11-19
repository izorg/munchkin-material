import {
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
} from "@mui/material";
import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import availableColors, {
  type AvailableColor,
} from "../../../utils/availableColors";
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
      <FormattedMessage
        defaultMessage="Choose color"
        description="Color picker dialog title"
        id="3djEDD"
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

export default ColorPickerDialog;
