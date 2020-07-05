import { ListItemIcon } from '@material-ui/core';
import { CellphoneArrowDown, InformationOutline } from 'mdi-material-ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useWorkbox } from '../../../WorkboxProvider';
import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'VersionItem';

const VersionItem = (props) => {
  const navigate = useNavigate();

  const { applyUpdate, update } = useWorkbox();

  const onClick = () => {
    if (update) {
      navigate(-1);
      applyUpdate();
    }
  };

  return (
    <ListItem button onClick={onClick} {...props}>
      <ListItemIcon>
        {update ? <CellphoneArrowDown /> : <InformationOutline />}
      </ListItemIcon>
      <ListItemText primary={VERSION} />
    </ListItem>
  );
};

VersionItem.displayName = displayName;

export default VersionItem;
