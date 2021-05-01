import { ClassNames } from "@emotion/react";
import { Popover } from "@material-ui/core";
import PropTypes from "prop-types";

import availableColors from "../../../utils/availableColors";
import { colorType } from "../../../utils/propTypes";

import Color from "./Color";

const displayName = "ColorPickerPopover";

const ColorPickerPopover = ({ onSelect, value, ...props }) => (
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
  value: colorType.isRequired,
};

ColorPickerPopover.displayName = displayName;

export default ColorPickerPopover;
