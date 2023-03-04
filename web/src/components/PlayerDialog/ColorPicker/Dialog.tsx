import {
  Dialog,
  DialogContent,
  type DialogProps,
  DialogTitle,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import availableColors from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";

type ColorPickerDialogProps = Omit<DialogProps, "onSelect"> & {
  onSelect: (color: string) => void;
  value?: string;
};

const ColorPickerDialog: FC<ColorPickerDialogProps> = ({
  onSelect,
  value,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Dialog {...props}>
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Choose color"
          id="colorPicker.dialog.title"
        />
      </DialogTitle>
      <DialogContent
        sx={{
          padding: theme.spacing(0, 1, 2),
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
    </Dialog>
  );
};

ColorPickerDialog.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType,
};

export default ColorPickerDialog;
