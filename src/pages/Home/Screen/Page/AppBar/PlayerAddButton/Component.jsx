import React from 'react';
import IconButton from 'material-ui/IconButton';
import PersonAddIcon from 'material-ui-icons/PersonAdd';

const PlayerAddButtonComponent = props => (
  <IconButton {...props}>
    <PersonAddIcon />
  </IconButton>
);

export default PlayerAddButtonComponent;
