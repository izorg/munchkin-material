import React from 'react';
import PropTypes from 'prop-types';
import { SpeedDialAction } from '@material-ui/lab';
import { noop } from 'lodash/fp';

const HelperButtonAction = ({ onClick, ...rest }) => (
  <SpeedDialAction
    {...rest}
    ButtonProps={{
      // eslint-disable-next-line react/button-has-type
      component: (props) => <button {...props} onClick={onClick} />,
    }}
    onClick={noop}
  />
);

HelperButtonAction.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HelperButtonAction;
