import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

const styles = {
  layoutContent: {
    flex: 1,
  },
};

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
