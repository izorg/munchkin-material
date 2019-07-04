import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  makeStyles,
} from '@material-ui/core';
import { noop } from 'lodash/fp';

import PlayerAvatar from '../../../components/PlayerAvatar';
import PlayerListItemText from '../../../components/PlayerListItemText';

const useStyles = makeStyles(
  (theme) => ({
    dialogPaper: {
      margin: theme.spacing(2),
    },

    content: {
      padding: 0,
    },
  }),
  { name: 'HelperSelector' },
);

const HelperSelector = ({ helpers, onSelect, ...props }) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{
        paper: classes.dialogPaper,
      }}
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

HelperSelector.propTypes = {
  helpers: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

HelperSelector.defaultProps = {
  helpers: [],
  onSelect: noop,
};

export default HelperSelector;
