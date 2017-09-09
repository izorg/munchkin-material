import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import { classesObject } from '../../utils/propTypes';

export { default as LayoutContent } from './Content';
export { default as LayoutHeader } from './Header';

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};

const Layout = ({ classes, className, ...props }) => (
  <div
    {...props}
    className={cns(classes.layout, className)}
  />
);

Layout.propTypes = {
  classes: classesObject.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

export default withStyles(styles)(Layout);
