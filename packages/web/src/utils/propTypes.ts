import PropTypes from "prop-types";

import availableColors, { type AvailableColor } from "./availableColors";

export const colorType = PropTypes.oneOf<AvailableColor>(availableColors);
