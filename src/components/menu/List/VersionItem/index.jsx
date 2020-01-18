import { ListItemIcon } from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { CellphoneArrowDown, InformationOutline } from 'mdi-material-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { applyUpdate } from '../../../../ducks/update';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'VersionItem';

const VersionItem = (props) => {
  const dispatch = useDispatch();

  const update = useSelector((state) => state.update);

  const onClick = () => {
    if (update) {
      dispatch(goBack());
      dispatch(applyUpdate());
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
