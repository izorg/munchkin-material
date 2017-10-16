import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import { classesObject } from '../../utils/propTypes';

const styles = {
  layoutContent: {
    flex: '1 1 auto',
    overflowY: 'auto',
  },
};

const LayoutContent = ({ classes, className, ...props }) => (
  <div
    {...props}
    className={cns(classes.layoutContent, className)}
  />
);

LayoutContent.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
};

LayoutContent.defaultProps = {
  className: '',
};

export default withStyles(styles)(LayoutContent);
