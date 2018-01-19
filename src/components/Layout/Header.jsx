import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

const styles = {
  layoutHeader: {
    flex: '0 0 auto',
    zIndex: 1,
  },
};

const LayoutHeader = ({ classes, className, ...props }) => (
  <div
    {...props}
    className={cns(classes.layoutHeader, className)}
  />
);

LayoutHeader.propTypes = {
  className: PropTypes.string,
};

LayoutHeader.defaultProps = {
  className: '',
};

export default withStyles(styles)(LayoutHeader);
