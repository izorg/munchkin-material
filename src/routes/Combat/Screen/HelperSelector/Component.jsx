import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ChevronUp from '@material-ui/icons/KeyboardArrowUp';
import { noop } from 'lodash/fp';

import ChevronDoubleUpIcon from '../../../../components/icons/ChevronDoubleUp';

const styles = (theme) => ({
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

  primary: {
    alignItems: 'center',
    display: 'flex',
  },

  name: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  level: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: theme.spacing.unit,
    width: 44,
  },

  strength: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: 4,
    width: 48,
  },
});

const HelperSelector = ({ classes, helpers, onSelect, ...props }) => (
  <Dialog
    {...props}
    classes={{
      paper: classes.dialogPaper,
    }}
  >
    <DialogTitle>
      <FormattedMessage
        id="combat.helperSelector.title"
        defaultMessage="Choose helper"
      />
    </DialogTitle>
    <DialogContent className={classes.content}>
      <List>
        {helpers.map((helper) => (
          <ListItem
            button
            key={helper.id.toString()}
            onClick={() => onSelect(helper.id)}
          >
            <ListItemText
              classes={{
                root: classes.textRoot,
                primary: classes.primary,
              }}
              primary={
                <Fragment>
                  <span className={classes.name}>{helper.name}</span>

                  <span className={classes.level}>
                    {helper.level}
                    <ChevronUp />
                  </span>

                  <span className={classes.strength}>
                    {helper.level + helper.gear}
                    <ChevronDoubleUpIcon />
                  </span>
                </Fragment>
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
