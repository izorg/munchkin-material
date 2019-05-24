import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useRef } from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Field, Form as FinalForm } from 'react-final-form';
import { shouldUpdate } from 'recompose';
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
  makeStyles,
  Radio,
  Slide,
  TextField,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { FEMALE, MALE } from 'munchkin-core';
import { stubFalse } from 'lodash/fp';

import { ios } from '../../utils/platforms';
import { sexProp } from '../../utils/propTypes';

import AppBar from './AppBar';
import ColorPicker from './ColorPicker';

const SlideUp = (props) => <Slide direction="up" {...props} />;

const useStyles = makeStyles(
  (theme) => ({
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
      '@supports (padding: max(0px))': {
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
  }),
  { name: 'PlayerDialog' },
);

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
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

const PlayerDialog = ({
  edit,
  initialValues,
  intl,
  onClose,
  onSubmit,
  open,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  const nameRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    appear = true;

    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);

        focusTimeoutRef.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);

      focusTimeoutRef.current = null;
    }

    onClose();
  };

  const handleEntered = () => {
    if (!edit && ios && window.cordova) {
      focusTimeoutRef.current = setTimeout(() => {
        const node = nameRef.current;

        focusTimeoutRef.current = null;

        if (node) {
          node.focus();
        }
      }, 100);
    }
  };

  const title = edit ? (
    <FormattedMessage
      defaultMessage="Edit munchkin"
      id="player.form.titleEdit"
    />
  ) : (
    <FormattedMessage defaultMessage="New munchkin" id="player.form.title" />
  );

  const Transition = fullScreen && ios ? SlideUp : Fade;

  return (
    <Dialog
      classes={{
        paper: classes.dialog,
      }}
      fullScreen={fullScreen}
      hideBackdrop={fullScreen}
      onClose={handleClose}
      onEntered={handleEntered}
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
        {fullScreen ? <AppBar onCancel={handleClose} title={title} /> : title}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Field name="name">
          {({ input }) => (
            <TextField
              autoFocus={!edit && (!ios || !window.cordova)}
              fullWidth
              inputRef={nameRef}
              margin="normal"
              placeholder={intl.formatMessage(messages.label)}
              {...input}
            />
          )}
        </Field>

        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage defaultMessage="Sex" id="player.form.sex" />
              </FormLabel>
              <FormControlLabel
                control={
                  <Field name="sex" type="radio">
                    {({
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
                    )}
                  </Field>
                }
                label={<GenderMale className={classes.icon} />}
                value={MALE}
              />
              <FormControlLabel
                control={
                  <Field name="sex" type="radio">
                    {({
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
                    )}
                  </Field>
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
              <Field name="color">
                {({ input }) => <ColorPicker {...input} />}
              </Field>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      {!fullScreen && (
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            <FormattedMessage defaultMessage="Cancel" id="player.form.cancel" />
          </Button>
          <Button color="primary" type="submit">
            <FormattedMessage defaultMessage="Save" id="player.form.save" />
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

PlayerDialog.propTypes = {
  edit: PropTypes.bool,
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

export default injectIntl(PlayerDialog);
