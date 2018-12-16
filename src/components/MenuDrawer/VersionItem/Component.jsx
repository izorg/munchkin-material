import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { InfoOutlined, SystemUpdate } from '@material-ui/icons';

const VersionItem = ({ update, version, ...rest }) => (
  <ListItem button {...rest}>
    <ListItemIcon>{update ? <SystemUpdate /> : <InfoOutlined />}</ListItemIcon>
    <ListItemText primary={version} />
  </ListItem>
);

VersionItem.propTypes = {
  update: PropTypes.bool,
  version: PropTypes.string.isRequired,
};

VersionItem.defaultProps = {
  update: false,
};

export default VersionItem;
