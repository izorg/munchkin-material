/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const storeShape = PropTypes.shape({
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});
