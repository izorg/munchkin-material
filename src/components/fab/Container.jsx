import React from 'react';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../utils/propTypes';

const styles = theme => ({
  fabContainer: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },
});

const Fab = ({ classes, ...props }) => (
  <div className={classes.fabContainer} {...props} />
);

Fab.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(Fab);
