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
  RadioGroup,
  Slide,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import React, { useEffect, useMemo, useRef } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { addPlayerToList } from '../../ducks/playerList';
import { addPlayer, updatePlayer } from '../../ducks/players';
import createPlayer from '../../utils/createPlayer';
import getRandomMaterialColor from '../../utils/getRandomMaterialColor';
import { useGoBack, useLocationQuery } from '../../utils/location';
import { ios } from '../../utils/platforms';
import { FEMALE, MALE } from '../../utils/sex';
import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';

import AppBar from './AppBar';
import ColorPicker from './ColorPicker';

const displayName = 'PlayerDialog';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: 'inherit', // scrolling body in cordova for small screen height
    },

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

const PlayerDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const nameRef = useRef(null);

  const goBack = useGoBack();
  const query = useLocationQuery();
  const open = query.player !== undefined;
  const players = useSelector((state) => state.players);

  const previousPlayerRef = useRef(players[query.player]);

  const editPlayer = useMemo(() => {
    if (open) {
      return players[query.player];
    }

    return previousPlayerRef.current;
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      previousPlayerRef.current = players[query.player];
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const randomColor = useMemo(
    () =>
      getRandomMaterialColor(
        Object.values(players).map((player) => player.color),
      ),
    [players],
  );

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  useEffect(() => {
    appear = true;
  }, []);

  const handleClose = () => goBack();

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const values = {
      color: form.color.value,
      name: form.name.value,
      sex: form.querySelector('input[name="sex"]:checked').value, // to support Android 4.4
    };

    if (!values.name.trim()) {
      handleClose();

      return;
    }

    if (editPlayer) {
      const equal = Object.keys(values).every(
        (key) => values[key] === editPlayer[key],
      );

      if (equal) {
        handleClose();

        return;
      }

      dispatch(
        updatePlayer({
          ...editPlayer,
          ...values,
        }),
      );
    } else {
      const newPlayer = createPlayer(values);

      dispatch(addPlayer(newPlayer));
      dispatch(addPlayerToList(newPlayer.id));
    }

    handleClose();
  };

  const title = editPlayer ? (
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
        root: classes.root,
      }}
      fullScreen={fullScreen}
      hideBackdrop={fullScreen}
      onClose={handleClose}
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
        <TextField
          autoFocus={!editPlayer}
          defaultValue={editPlayer?.name}
          fullWidth
          inputRef={nameRef}
          label={intl.formatMessage(messages.label)}
          margin="normal"
          name="name"
        />

        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage defaultMessage="Sex" id="player.form.sex" />
              </FormLabel>
              <RadioGroup defaultValue={editPlayer?.sex || MALE} name="sex">
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
              <ColorPicker
                defaultValue={editPlayer?.color || randomColor}
                name="color"
              />
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
