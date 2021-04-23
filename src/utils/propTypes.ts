import PropTypes from "prop-types";

import availableColors from "./availableColors";
import { Sex } from "./types";

export const colorType = PropTypes.oneOf(availableColors);

export const playerShape = PropTypes.shape({
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const sexProp = PropTypes.oneOf([Sex.Female, Sex.Male]);
