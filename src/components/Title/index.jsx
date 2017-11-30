import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { classesObject } from '../../utils/propTypes';

const styles = {
  title: {
    flex: 1,
  },
};

const Title = ({ className, classes, ...props }) => (
  <Typography
    className={cns(classes.title, className)}
    color="inherit"
    noWrap
    type="title"
    {...props}
  />
);

Title.propTypes = {
  className: PropTypes.string,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

Title.defaultProps = {
  className: '',
};

export default withStyles(styles)(Title);
