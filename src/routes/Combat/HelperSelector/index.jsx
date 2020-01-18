import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  makeStyles,
} from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { flow, get, isEqual } from 'lodash/fp';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import PlayerAvatar from '../../../components/PlayerAvatar';
import PlayerListItemText from '../../../components/PlayerListItemText';
import { setCombatHelper } from '../../../ducks/combat';
import { getQuery } from '../../../utils/location';

const displayName = 'HelperSelector';

const useStyles = makeStyles(
  (theme) => ({
    dialogPaper: {
      margin: theme.spacing(2),
    },

    content: {
      padding: 0,
    },
  }),
  { name: displayName },
);

const HelperSelector = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const helpers = useSelector((state) =>
    state.playerList
      .filter((id) => id !== state.combat.playerId)
      .map((id) => state.players[id]),
  );

  const open = useSelector(flow(getQuery, get('add'), isEqual('helper')));

  const onClose = () => dispatch(goBack());

  const onSelect = (id) => {
    dispatch(setCombatHelper(id));
    dispatch(goBack());
  };

  return (
    <Dialog
      classes={{
        paper: classes.dialogPaper,
      }}
      onClose={onClose}
      open={open}
      {...props}
    >
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Choose helper"
          id="combat.helperSelector.title"
        />
      </DialogTitle>
      <DialogContent className={classes.content}>
        <List>
          {helpers.map((helper) => (
            <ListItem
              key={helper.id.toString()}
              button
              onClick={() => onSelect(helper.id)}
            >
              <ListItemAvatar>
                <PlayerAvatar color={helper.color} sex={helper.sex} />
              </ListItemAvatar>
              <PlayerListItemText player={helper} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

HelperSelector.displayName = displayName;

export default HelperSelector;
