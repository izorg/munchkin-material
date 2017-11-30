import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
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
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
};

const Layout = ({ classes, className, ...props }) => (
  <Paper
    className={cns(classes.layout, className)}
    elevation={0}
    square
    {...props}
  />
);

Layout.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

export default withStyles(styles)(Layout);
