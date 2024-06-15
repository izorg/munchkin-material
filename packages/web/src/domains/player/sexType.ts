import PropTypes from "prop-types";

import { Sex } from "./Sex";

export const sexType = PropTypes.oneOf(Object.values(Sex));
