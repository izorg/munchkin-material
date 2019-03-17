import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SpeedDialAction } from '@material-ui/lab';
import { noop } from 'lodash/fp';

const HelperButtonAction = ({ onClick, ...rest }) => {
  const component = useCallback(
    forwardRef((props, ref) => (
      // eslint-disable-next-line react/button-has-type
      <button {...props} ref={ref} onClick={onClick} />
    )),
    [onClick],
  );

  return (
    <SpeedDialAction
      {...rest}
      ButtonProps={{
        component,
      }}
      onClick={noop}
    />
  );
};

HelperButtonAction.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HelperButtonAction;
