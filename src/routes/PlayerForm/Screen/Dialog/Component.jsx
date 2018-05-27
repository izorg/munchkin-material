import React, { PureComponent } from 'react';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import { noop } from 'lodash';

import { sexProp } from '../../../../utils/propTypes';

import AppBar from './AppBar';
import Form from './Form';

const FORM_ID = 'player-form';

const styles = (theme) => ({
  dialog: {
    minWidth: 320,
  },

  title: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },

  content: {
    [theme.breakpoints.up('md')]: {
      alignSelf: 'center',
      width: 600,
    },

    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },

  icon: {
    fontSize: theme.typography.pxToRem(24),
  },
});

class DialogComponent extends PureComponent {
  static handleExternalSubmit() {
    let event;

    if (typeof Event === 'function') {
      event = new Event('submit');
    } else {
      event = document.createEvent('Event');

      event.initEvent('submit', true, true);
    }

    document.getElementById(FORM_ID).dispatchEvent(event);
  }

  constructor(props) {
    super(props);

    this.state = {
      appear: props.appear,
    };

    this.handleExited = this.handleExited.bind(this);
    this.renderTransition = this.renderTransition.bind(this);
  }

  handleExited() {
    if (!this.state.appear) {
      this.setState({
        appear: true,
      });
    }
  }

  renderTransition(props) {
    const { fullScreen } = this.props;
    const { appear } = this.state;

    if (fullScreen) {
      return <Slide {...props} appear={appear} direction="up" />;
    }

    return <Fade {...props} appear={appear} />;
  }

  render() {
    const {
      classes,
      fullScreen,
      initialValues,
      newPlayer,
      onClose,
      onSubmit,
      open,
    } = this.props;

    const title =
      initialValues && initialValues.id ? (
        <FormattedMessage
          id="player.form.titleEdit"
          defaultMessage="Edit munchkin"
        />
      ) : (
        <FormattedMessage
          id="player.form.title"
          defaultMessage="New munchkin"
        />
      );

    return (
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        fullScreen={fullScreen}
        hideBackdrop={fullScreen}
        onClose={onClose}
        onExited={this.handleExited}
        open={open}
        TransitionComponent={this.renderTransition}
      >
        <DialogTitle className={classes.title}>
          <Hidden lgUp>
            <AppBar
              onSubmit={DialogComponent.handleExternalSubmit}
              title={title}
            />
          </Hidden>
          <Hidden mdDown>{title}</Hidden>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Form
            autoFocus={newPlayer}
            id={FORM_ID}
            initialValues={initialValues}
            onSubmit={onSubmit}
          />
        </DialogContent>
        <Hidden mdDown>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              <FormattedMessage
                id="player.form.cancel"
                defaultMessage="Cancel"
              />
            </Button>
            <Button
              color="primary"
              onClick={DialogComponent.handleExternalSubmit}
            >
              <FormattedMessage id="player.form.save" defaultMessage="Save" />
            </Button>
          </DialogActions>
        </Hidden>
      </Dialog>
    );
  }
}

DialogComponent.propTypes = {
  appear: PropTypes.bool,
  fullScreen: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string,
    sex: sexProp.isRequired,
  }).isRequired,
  newPlayer: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

DialogComponent.defaultProps = {
  appear: false,
  newPlayer: true,
  onClose: noop,
  onSubmit: noop,
  open: false,
};

export default compose(
  withStyles(styles),
  withMobileDialog({ breakpoint: 'md' }),
)(DialogComponent);
