import React from 'react';
import PropTypes from 'prop-types';
import { ListItemIcon } from '@material-ui/core';
import { CellphoneArrowDown, InformationOutline } from 'mdi-material-ui';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const VersionItem = ({ update, ...rest }) => (
  <ListItem button {...rest}>
    <ListItemIcon>
      {update ? <CellphoneArrowDown /> : <InformationOutline />}
    </ListItemIcon>
    <ListItemText primary={VERSION} />
  </ListItem>
);

VersionItem.propTypes = {
  update: PropTypes.bool,
};

VersionItem.defaultProps = {
  update: false,
};

export default VersionItem;
