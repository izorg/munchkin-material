import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const VersionItem = ({ update, version, ...rest }) => (
  <ListItem button {...rest}>
    <ListItemIcon>{update ? <SystemUpdateIcon /> : <InfoIcon />}</ListItemIcon>
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
