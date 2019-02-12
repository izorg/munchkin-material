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
      bottom: theme.spacing(1),
      left: theme.spacing(1),
      right: theme.spacing(1),

      '@supports(padding: max(0px))': {
        left: `max(${theme.spacing(1)}px, env(safe-area-inset-right))`,
        right: `max(${theme.spacing(1)}px, env(safe-area-inset-right))`,
      },
    },

    content: {
      borderRadius: theme.shape.borderRadius,
    },
  },
});

class UndoSnackbar extends Component {
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
          <Button color="secondary" onClick={(event) => onClose(event, 'undo')}>
            <FormattedMessage defaultMessage="Undo" id="undo" />
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

UndoSnackbar.propTypes = {
  onClose: PropTypes.func.isRequired,
  width: widthProp.isRequired,
};

export default compose(
  withWidth(),
  withStyles(styles),
)(UndoSnackbar);
