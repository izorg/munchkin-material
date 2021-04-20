import PropTypes from "prop-types";

import availableColors from "./availableColors";
import { FEMALE, MALE } from "./sex";

export const colorType = PropTypes.oneOf(availableColors);

export const playerShape = PropTypes.shape({
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string,
});

export const sexProp = PropTypes.oneOf([FEMALE, MALE]);
