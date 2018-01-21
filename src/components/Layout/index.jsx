import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

export { default as LayoutContent } from './Content';

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
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

export default withStyles(styles)(Layout);
