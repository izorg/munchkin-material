import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { noop } from '../../constants';

const AddButton = props => (
  <FloatingActionButton onClick={props.onClick}>
    <ContentAdd />
  </FloatingActionButton>
);

AddButton.propTypes = {
  onClick: PropTypes.func,
};

AddButton.defaultProps = {
  onClick: noop,
};

export default AddButton;
