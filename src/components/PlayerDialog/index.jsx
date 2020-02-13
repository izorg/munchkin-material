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
  Input,
  makeStyles,
  Radio,
  RadioGroup,
  Slide,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { goBack } from 'connected-react-router';
import { isEqual } from 'lodash/fp';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import React, { useEffect, useRef, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

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

const displayName = 'PlayerDialog';

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
  { name: displayName },
);

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

let appear = false;

const getPlayerId = (state) => getQuery(state).player;

const getInitialValues = createSelector(
  getPlayerId,
  (state) => state.players,
  (playerId, players) =>
    playerId
      ? players[playerId]
      : {
          color: getRandomMaterialColor(
            Object.values(players).map((player) => player.color),
          ),
          sex: MALE,
        },
);

const PlayerDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const defaultInitialValues = useSelector(getInitialValues);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const edit = useSelector((state) => Boolean(getPlayerId(state)));
  const open = useSelector((state) => getPlayerId(state) !== undefined);

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  const nameRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    if (open) {
      setInitialValues(defaultInitialValues);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const values = {
      color: form.color.value,
      name: form.name.value,
      sex: form.querySelector('input[name="sex"]:checked').value, // to support Android 4.4
    };

    const playerValues = {
      color: initialValues.color,
      name: initialValues.name,
      sex: initialValues.sex,
    };

    if (!isEqual(values, playerValues)) {
      if (values.name.trim()) {
        const player = createPlayer({
          ...initialValues,
          ...values,
        });

        if (initialValues.id) {
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
        component: 'form',
        name: 'player',
        onSubmit,
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
        <FormControl fullWidth margin="normal">
          <Input
            autoFocus={!edit && (!ios || !window.cordova)}
            defaultValue={initialValues.name}
            inputRef={nameRef}
            name="name"
            placeholder={intl.formatMessage(messages.label)}
          />
        </FormControl>

        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage defaultMessage="Sex" id="player.form.sex" />
              </FormLabel>
              <RadioGroup defaultValue={initialValues.sex} name="sex">
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={<GenderMale className={classes.icon} />}
                  value={MALE}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={<GenderFemale className={classes.icon} />}
                  value={FEMALE}
                />
              </RadioGroup>
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
              <ColorPicker defaultValue={initialValues.color} name="color" />
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

PlayerDialog.displayName = displayName;

export default PlayerDialog;
