import { ListItemIcon } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { CellphoneArrowDown, InformationOutline } from 'mdi-material-ui';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useWorkbox } from '../../../WorkboxProvider';
import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'VersionItem';

const VersionItem = (props) => {
  const dispatch = useDispatch();

  const { applyUpdate, update } = useWorkbox();

  const onClick = () => {
    if (update) {
      dispatch(goBack());
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
