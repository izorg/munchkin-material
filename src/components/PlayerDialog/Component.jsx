import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { FEMALE, MALE } from 'munchkin-core';
import React, { Component, createRef } from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Field, Form as FinalForm } from 'react-final-form';
import { compose, shouldUpdate } from 'recompose';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  Slide,
  TextField,
  withMobileDialog,
  withStyles,
} from '@material-ui/core';
import { stubFalse } from 'lodash/fp';

import { ios } from '../../utils/platforms';
import { sexProp } from '../../utils/propTypes';

import ScreenTransition from '../Screen/Transition';

import AppBar from './AppBar';
import ColorPicker from './ColorPicker';

const SlideUp = (props) => <Slide direction="up" {...props} />;

const styles = (theme) => ({
  dialog: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    minWidth: 320,

    [theme.breakpoints.up('lg')]: {
      backgroundColor: theme.palette.background.paper,
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

  icon: {
    verticalAlign: 'middle',
  },
});

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

// eslint-disable-next-line react/prop-types
const renderColorPicker = ({ input, ...props }) => (
  <ColorPicker {...input} {...props} />
);

const renderRadio = ({
  // eslint-disable-next-line react/prop-types
  input: { checked, name, onChange, value, ...inputProps },
}) => (
  <Radio
    checked={checked}
    color="primary"
    inputProps={inputProps}
    name={name}
    onChange={onChange}
    value={value}
  />
);

// eslint-disable-next-line react/prop-types
const renderTextField = ({ input, meta, ...props }) => (
  <TextField {...input} {...props} />
);

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

    this.nameRef = createRef();

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
    const node = this.nameRef.current;

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
      intl,
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
          {fullScreen ? (
            <AppBar onCancel={this.handleClose} title={title} />
          ) : (
            title
          )}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Field
            autoFocus={!edit && (!ios || !window.cordova)}
            component={renderTextField}
            fullWidth
            inputRef={this.nameRef}
            margin="normal"
            name="name"
            placeholder={intl.formatMessage(messages.label)}
          />

          <Grid container>
            <Grid item xs={6}>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">
                  <FormattedMessage defaultMessage="Sex" id="player.form.sex" />
                </FormLabel>
                <FormControlLabel
                  control={
                    <Field component={renderRadio} name="sex" type="radio" />
                  }
                  label={<GenderMale className={classes.icon} />}
                  value={MALE}
                />
                <FormControlLabel
                  control={
                    <Field component={renderRadio} name="sex" type="radio" />
                  }
                  label={<GenderFemale className={classes.icon} />}
                  value={FEMALE}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl margin="normal">
                <FormLabel>
                  <FormattedMessage
                    defaultMessage="Color"
                    id="player.form.color"
                  />
                </FormLabel>
                <Field component={renderColorPicker} name="color" />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        {!fullScreen && (
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
        )}
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
  intl: intlShape.isRequired,
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
  injectIntl,
  withStyles(styles),
)(PlayerDialog);
