import React, { createRef, PureComponent } from 'react';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { noop } from 'lodash/fp';

import { ios } from '../../utils/platforms';

import FadeUp from '../FadeUp';

import AppBar from './AppBar';
import Form from './Form';

const FORM_ID = 'player-form';

const SlideUp = (props) => <Slide direction="up" {...props} />;

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
});

let appear = false;

class PlayerDialog extends PureComponent {
  static getDerivedStateFromProps(props) {
    if (props.playerId) {
      return {
        edit: true,
      };
    }

    if (props.playerId === null) {
      return {
        edit: false,
      };
    }

    return null;
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

    this.nameRef = createRef();

    this.handleEntered = this.handleEntered.bind(this);
  }

  componentDidMount() {
    appear = true;
  }

  handleEntered() {
    const { edit } = this.state;

    const node = this.nameRef.current;

    if (!edit && node) {
      node.focus();
    }
  }

  render() {
    const { classes, fullScreen, onClose, playerId } = this.props;

    const { edit } = this.state;

    const title = edit ? (
      <FormattedMessage
        id="player.form.titleEdit"
        defaultMessage="Edit munchkin"
      />
    ) : (
      <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />
    );

    let Transition = Fade;

    if (fullScreen) {
      Transition = ios ? SlideUp : FadeUp;
    }

    return (
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        disableRestoreFocus
        fullScreen={fullScreen}
        hideBackdrop={fullScreen}
        onClose={onClose}
        onEntered={this.handleEntered}
        open={playerId !== undefined}
        TransitionComponent={Transition}
        TransitionProps={{
          appear,
        }}
      >
        <DialogTitle className={classes.title}>
          <Hidden lgUp>
            <AppBar
              onSubmit={PlayerDialog.handleExternalSubmit}
              title={title}
            />
          </Hidden>
          <Hidden mdDown>{title}</Hidden>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Form id={FORM_ID} nameRef={this.nameRef} playerId={playerId} />
        </DialogContent>
        <Hidden mdDown>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              <FormattedMessage
                id="player.form.cancel"
                defaultMessage="Cancel"
              />
            </Button>
            <Button color="primary" onClick={PlayerDialog.handleExternalSubmit}>
              <FormattedMessage id="player.form.save" defaultMessage="Save" />
            </Button>
          </DialogActions>
        </Hidden>
      </Dialog>
    );
  }
}

PlayerDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  playerId: PropTypes.string,
};

PlayerDialog.defaultProps = {
  onClose: noop,
  playerId: undefined,
};

export default compose(
  withStyles(styles),
  withMobileDialog({ breakpoint: 'md' }),
)(PlayerDialog);
