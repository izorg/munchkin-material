import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import { noop } from '../../../constants';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const styles = {
  dialogPaper: {
    width: '75%',
  },

  textRoot: {
    overflow: 'hidden',
    paddingRight: 0,
  },
};

const HelperSelector = ({ classes, helpers, onSelect, ...props }) => (
  <Dialog
    {...props}
    classes={{
      paper: classes.dialogPaper,
    }}
  >
    <List>
      {helpers.map(helper => (
        <ListItem
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
                    strength: <b>{helper.strength}</b>,
                  }}
                />
              </span>
            }
          />
        </ListItem>
      ))}
    </List>
  </Dialog>
);

HelperSelector.propTypes = {
  classes: classesObject.isRequired,
  helpers: PropTypes.arrayOf(playerInstance),
  onSelect: PropTypes.func,
};

HelperSelector.defaultProps = {
  helpers: [],
  onSelect: noop,
};

export default withStyles(styles)(HelperSelector);
