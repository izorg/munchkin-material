import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { Button, Fade, Snackbar, withStyles } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import cns from 'classnames';

import { widthProp } from '../../utils/propTypes';

const styles = (theme) => ({
  [theme.breakpoints.down('sm')]: {
    root: {
      bottom: theme.spacing.unit,
      left: theme.spacing.unit,
      right: theme.spacing.unit,
    },

    content: {
      borderRadius: theme.shape.borderRadius,
    },
  },
});

class Undo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    const { children, message } = nextProps;

    if (children || message) {
      return {
        children,
        message,
      };
    }

    return null;
  }

  render() {
    const { classes, className, onClose, width, ...rest } = this.props;
    const { children, message } = this.state;

    return (
      <Snackbar
        action={
          <Button color="primary" onClick={(event) => onClose(event, 'undo')}>
            <FormattedMessage id="undo" defaultMessage="Undo" />
          </Button>
        }
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        className={cns(classes.root, className)}
        ContentProps={{ className: classes.content }}
        onClose={onClose}
        TransitionComponent={isWidthDown('sm', width) ? Fade : undefined}
        {...rest}
        message={message}
      >
        {children}
      </Snackbar>
    );
  }
}

Undo.propTypes = {
  onClose: PropTypes.func.isRequired,
  width: widthProp.isRequired,
};

export default compose(
  withWidth(),
  withStyles(styles),
)(Undo);
