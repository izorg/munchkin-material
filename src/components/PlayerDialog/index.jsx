import React, { useEffect, useRef } from 'react';
import { goBack } from 'connected-react-router';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { flow, get, isUndefined, map, negate } from 'lodash/fp';

import { addPlayerToList } from '../../ducks/playerList';
import { addPlayer, updatePlayer } from '../../ducks/players';
import createPlayer from '../../utils/createPlayer';
import getRandomMaterialColor from '../../utils/getRandomMaterialColor';
import { getQuery } from '../../utils/location';
import { ios } from '../../utils/platforms';
import { FEMALE, MALE } from '../../utils/sex';

import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';

import AppBar from './AppBar';
import ColorPicker from './ColorPicker';

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

const getPlayerId = flow(
  getQuery,
  get('player'),
);

const getEdit = createSelector(
  getPlayerId,
  Boolean,
);

const getInitialValues = createSelector(
  getPlayerId,
  get('players'),
  (playerId, players) =>
    playerId
      ? players[playerId]
      : {
          color: getRandomMaterialColor(map('color', players)),
          sex: MALE,
        },
);

const getOpen = createSelector(
  getPlayerId,
  negate(isUndefined),
);

const PlayerDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const edit = useSelector(getEdit);
  const initialValues = useSelector(getInitialValues);
  const open = useSelector(getOpen);

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  const nameRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  const initialValuesRef = useRef();

  if (open) {
    initialValuesRef.current = initialValues;
  }

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

    dispatch(goBack());
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

  const onSubmit = (values, form) => {
    const { dirty } = form.getState();

    if (dirty) {
      const { id, name = '' } = values;

      if (name.trim()) {
        const player = createPlayer(values);

        if (id) {
          dispatch(updatePlayer(player));
        } else {
          dispatch(addPlayer(player));
          dispatch(addPlayerToList(player.id));
        }
      }
    }

    dispatch(goBack());
  };

  const title = edit ? (
    <FormattedMessage
      defaultMessage="Edit munchkin"
      id="player.form.titleEdit"
    />
  ) : (
    <FormattedMessage defaultMessage="New munchkin" id="player.form.title" />
  );

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
        component: (props) => (
          <Form
            initialValues={initialValuesRef.current}
            onSubmit={onSubmit}
            subscription={{ submitting: true }}
          >
            {({ handleSubmit }) => <form onSubmit={handleSubmit} {...props} />}
          </Form>
        ),
      }}
      TransitionComponent={fullScreen && ios ? Slide : Fade}
      TransitionProps={{
        appear,
        direction: 'up',
      }}
    >
      <DialogTitle className={classes.title}>
        {fullScreen ? <AppBar onCancel={handleClose} title={title} /> : title}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Field name="name">
          {({ input }) => (
            <TextField
              {...input}
              autoFocus={!edit && (!ios || !window.cordova)}
              fullWidth
              inputRef={nameRef}
              margin="normal"
              placeholder={intl.formatMessage(messages.label)}
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
          <CancelButton onClick={handleClose} />
          <SubmitButton>
            <FormattedMessage defaultMessage="Save" id="player.form.save" />
          </SubmitButton>
        </DialogActions>
      )}
    </Dialog>
  );
};

PlayerDialog.displayName = 'PlayerDialog';

export default PlayerDialog;
