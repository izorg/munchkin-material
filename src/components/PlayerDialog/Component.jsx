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
import cns from 'classnames';
import { noop } from 'lodash/fp';

import FadeUp from '../FadeUp';

import AppBar from './AppBar';
import Form from './Form';

const FORM_ID = 'player-form';

const styles = (theme) => ({
  root: {
    height: '100%',
  },

  dialog: {
    minWidth: 320,
  },

  title: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },

  content: {
    '@supports(padding: max(0px))': {
      paddingLeft: 'max(24px, env(safe-area-inset-left))',
      paddingRight: 'max(24px, env(safe-area-inset-right))',
    },

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
  static getDerivedStateFromProps(nextProps, prevState) {
    let state = null;

    if (prevState.appear === undefined) {
      state = {
        ...state,
        appear: !nextProps.open,
      };
    } else {
      state = {
        ...state,
        appear: true,
      };
    }

    if (nextProps.playerId) {
      state = {
        ...state,
        edit: true,
      };
    } else if (nextProps.playerId === null) {
      state = {
        ...state,
        edit: false,
      };
    }

    return state;
  }

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

    this.state = {};

    this.renderTransition = this.renderTransition.bind(this);
  }

  renderTransition(props) {
    const { fullScreen } = this.props;
    const { appear } = this.state;

    const Transition = fullScreen ? FadeUp : Fade;

    return <Transition {...props} appear={appear} />;
  }

  render() {
    const { classes, className, fullScreen, onClose, playerId } = this.props;

    const { edit } = this.state;

    const title = edit ? (
      <FormattedMessage
        id="player.form.titleEdit"
        defaultMessage="Edit munchkin"
      />
    ) : (
      <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />
    );

    return (
      <Dialog
        className={cns(classes.root, className)}
        classes={{
          paper: classes.dialog,
        }}
        disableRestoreFocus
        fullScreen={fullScreen}
        hideBackdrop={fullScreen}
        onClose={onClose}
        open={playerId !== undefined}
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
          <Form id={FORM_ID} playerId={playerId} />
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
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  playerId: PropTypes.string,
};

DialogComponent.defaultProps = {
  onClose: noop,
  playerId: undefined,
};

export default compose(
  withStyles(styles),
  withMobileDialog({ breakpoint: 'md' }),
)(DialogComponent);
