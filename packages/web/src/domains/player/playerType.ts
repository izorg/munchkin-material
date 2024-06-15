import PropTypes from "prop-types";

import { colorType } from "../../utils/propTypes";

import { sexType } from "./sexType";

export const playerType = PropTypes.shape({
  color: colorType,
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sex: sexType.isRequired,
});
