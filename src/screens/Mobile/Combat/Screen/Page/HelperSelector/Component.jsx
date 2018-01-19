import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash-es';

const styles = {
  dialogPaper: {
    overflowY: 'auto',
    width: '75%',
  },

  content: {
    padding: 0,
  },

  textRoot: {
    overflow: 'hidden',
    paddingRight: 0,
  },
};

const HelperSelector = ({
  classes, helpers, onSelect, ...props
}) => (
  <Dialog
    {...props}
    classes={{
      paper: classes.dialogPaper,
    }}
  >
    <DialogTitle>
      <FormattedMessage id="combat.helperSelector.title" defaultMessage="Choose helper" />
    </DialogTitle>
    <DialogContent className={classes.content}>
      <List>
        {helpers.map(helper => (
          <ListItem
            button
            key={helper.id.toString()}
            onClick={() => onSelect(helper.id)}
          >
            <ListItemText
              classes={{
                root: classes.textRoot,
              }}
              primary={<Typography component="div" noWrap>{helper.name}</Typography>}
              secondary={
                <span>
                  <FormattedMessage
                    id="combat.helperSelector.level"
                    defaultMessage="Level {level}"
                    values={{
                    level: <b>{helper.level}</b>,
                  }}
                  />
                  <br />
                  <FormattedMessage
                    id="combat.helperSelector.strength"
                    defaultMessage="Strength {strength}"
                    values={{
                    strength: <b>{helper.level + helper.gear}</b>,
                  }}
                  />
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </DialogContent>
  </Dialog>
);

HelperSelector.propTypes = {
  helpers: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

HelperSelector.defaultProps = {
  helpers: [],
  onSelect: noop,
};

export default withStyles(styles)(HelperSelector);
