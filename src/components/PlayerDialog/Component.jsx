import React, { Component, createRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import { compose, shouldUpdate } from 'recompose';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Hidden,
  Slide,
  withMobileDialog,
  withStyles,
} from '@material-ui/core';
import { stubFalse } from 'lodash/fp';

import { ios } from '../../utils/platforms';
import { sexProp } from '../../utils/propTypes';

import ScreenTransition from '../Screen/Transition';

import AppBar from './AppBar';
import Content from './Content';

const SlideUp = (props) => <Slide direction="up" {...props} />;

const styles = (theme) => ({
  dialog: {
    minWidth: 320,

    [theme.palette.type === 'dark' && theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.background.default,
    },
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

const FormComponent = shouldUpdate(stubFalse)(
  ({ initialValues, onSubmit, ...rest }) => (
    <FinalForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      subscription={{ submitting: true }}
    >
      {({ handleSubmit }) => <form onSubmit={handleSubmit} {...rest} />}
    </FinalForm>
  ),
);

class PlayerDialog extends Component {
  constructor(props) {
    super(props);

    this.contentRef = createRef();

    this.handleClose = this.handleClose.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.focusName = this.focusName.bind(this);
  }

  componentDidMount() {
    appear = true;
  }

  componentWillUnmount() {
    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout);

      this.focusTimeout = null;
    }
  }

  handleClose() {
    const { onClose } = this.props;

    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout);

      this.focusTimeout = null;
    }

    onClose();
  }

  handleEntered() {
    const { edit } = this.props;

    if (!edit && ios && window.cordova) {
      this.focusTimeout = setTimeout(this.focusName, 100);
    }
  }

  focusName() {
    const node = this.contentRef.current.nameRef.current;

    this.focusTimeout = null;

    if (node) {
      node.focus();
    }
  }

  render() {
    const {
      classes,
      edit,
      fullScreen,
      initialValues,
      onSubmit,
      open,
    } = this.props;

    const title = edit ? (
      <FormattedMessage
        defaultMessage="Edit munchkin"
        id="player.form.titleEdit"
      />
    ) : (
      <FormattedMessage defaultMessage="New munchkin" id="player.form.title" />
    );

    let Transition = Fade;

    if (fullScreen) {
      Transition = ios ? SlideUp : ScreenTransition;
    }

    return (
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        disableRestoreFocus
        fullScreen={fullScreen}
        hideBackdrop={fullScreen}
        onClose={this.handleClose}
        onEntered={this.handleEntered}
        open={open}
        PaperProps={{
          component: FormComponent,
          initialValues,
          onSubmit,
        }}
        TransitionComponent={Transition}
        TransitionProps={{
          appear,
        }}
      >
        <DialogTitle className={classes.title}>
          <Hidden lgUp>
            <AppBar onCancel={this.handleClose} title={title} />
          </Hidden>
          <Hidden mdDown>{title}</Hidden>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Content
            autoFocus={!edit && (!ios || !window.cordova)}
            innerRef={this.contentRef}
          />
        </DialogContent>
        <Hidden mdDown>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              <FormattedMessage
                defaultMessage="Cancel"
                id="player.form.cancel"
              />
            </Button>
            <Button color="primary" type="submit">
              <FormattedMessage defaultMessage="Save" id="player.form.save" />
            </Button>
          </DialogActions>
        </Hidden>
      </Dialog>
    );
  }
}

PlayerDialog.propTypes = {
  edit: PropTypes.bool,
  fullScreen: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    color: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    sex: sexProp.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

PlayerDialog.defaultProps = {
  edit: false,
  open: false,
};

export default compose(
  withMobileDialog({ breakpoint: 'md' }),
  withStyles(styles),
)(PlayerDialog);
