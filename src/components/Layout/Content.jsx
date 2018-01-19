import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

const styles = theme => ({
  layoutContent: {
    flexGrow: 1,
    overflowY: 'auto',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
});

const LayoutContent = ({ classes, className, ...props }) => (
  <div
    {...props}
    className={cns(classes.layoutContent, className)}
  />
);

LayoutContent.propTypes = {
  className: PropTypes.string,
};

LayoutContent.defaultProps = {
  className: '',
};

export default withStyles(styles)(LayoutContent);
