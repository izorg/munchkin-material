import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

const styles = (theme) => ({
  root: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },
});

const FabButton = ({ classes, className, ...rest }) => (
  <Button
    className={cns(className, classes.root)}
    color="primary"
    variant="fab"
    {...rest}
  />
);

export default withStyles(styles)(FabButton);
