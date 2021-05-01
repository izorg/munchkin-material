import { css } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import availableColors from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";

const ColorPickerDialog = ({ onSelect, value, ...props }) => {
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
        css={css`
          padding: ${theme.spacing(0, 1, 2)};
          text-align: center;
        `}
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
  value: colorType.isRequired,
};

export default ColorPickerDialog;
