import PropTypes from "prop-types";

import availableColors, { type AvailableColor } from "./availableColors";
import { Sex } from "./types";

export const colorType = PropTypes.oneOf<AvailableColor>(availableColors);

export const sexType = PropTypes.oneOf(Object.values(Sex));

export const playerShape = PropTypes.shape({
  color: colorType,
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sex: sexType.isRequired,
});
