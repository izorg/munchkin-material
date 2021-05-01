import "formdata-polyfill"; // for iOS Safari <= 12

import { ClassNames, css } from "@emotion/react";
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
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Delete, GenderFemale, GenderMale } from "mdi-material-ui";
import { useEffect, useMemo, useRef } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { addPlayerToList } from "../../ducks/playerList";
import { addPlayer, updatePlayer } from "../../ducks/players";
import createPlayer from "../../utils/createPlayer";
import getRandomMaterialColor from "../../utils/getRandomMaterialColor";
import { useGoBack, useLocationQuery } from "../../utils/location";
import { ios } from "../../utils/platforms";
import { FEMALE, MALE } from "../../utils/sex";
import useDeletePlayers from "../../utils/useDeletePlayers";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";

import AppBar from "./AppBar";
import ColorPicker from "./ColorPicker";

const messages = defineMessages({
  label: {
    defaultMessage: "Name",
    id: "player.form.namePlaceholder",
  },
});

let appear = false;

const PlayerDialog = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const deletePlayers = useDeletePlayers();
  const goBack = useGoBack();
  const query = useLocationQuery();
  const open = query.player !== undefined;
  const players = useSelector((state) => state.present.players);

  const previousPlayerRef = useRef(players[query.player]);

  const editPlayer = useMemo(() => {
    if (open) {
      return players[query.player];
    }

    return previousPlayerRef.current;
  }, [open, players, query.player]);

  useEffect(() => {
    if (open) {
      previousPlayerRef.current = players[query.player];
    }
  }, [open, players, query.player]);

  const randomColor = useMemo(
    () =>
      getRandomMaterialColor(
        Object.values(players).map((player) => player.color)
      ),
    [players]
  );

  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    appear = true;
  }, []);

  const handleClose = () => goBack();

  const handleDelete = editPlayer
    ? () => {
        deletePlayers([editPlayer.id]);
        goBack();
      }
    : undefined;

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const values = Object.fromEntries(formData);

    if (!values.name.trim()) {
      handleClose();

      return;
    }

    if (editPlayer) {
      const equal = Object.keys(values).every(
        (key) => values[key] === editPlayer[key]
      );

      if (equal) {
        handleClose();

        return;
      }

      dispatch(
        updatePlayer({
          ...editPlayer,
          ...values,
        })
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

  const titleCss = css`
    align-items: center;
    display: flex;
    justify-content: space-between;

    ${theme.breakpoints.down("lg")} {
      display: block;
      padding: 0;
    }
  `;

  const deleteIconButtonCss = css`
    margin-left: 8px;
    padding: 4px;
  `;

  const contentCss = css`
    @supports (padding: max(0px)) {
      padding-left: max(24px, env(safe-area-inset-left));
      padding-right: max(24px, env(safe-area-inset-right));
    }

    ${theme.breakpoints.up("md")} {
      align-self: center;
      width: 600px;
    }
  `;

  const iconCss = css`
    vertical-align: middle;
  `;

  return (
    <ClassNames>
      {({ css }) => (
        <Dialog
          classes={{
            paper: css`
              background-color: ${theme.palette.mode === "dark"
                ? theme.palette.background.default
                : theme.palette.background.paper};
              min-width: 320px;

              ${theme.breakpoints.up("lg")} {
                background-color: ${theme.palette.background.paper};
              }
            `,
            root: css`
              height: inherit; /* scrolling body in cordova for small screen height */
            `,
          }}
          disableRestoreFocus
          fullScreen={fullScreen}
          hideBackdrop={fullScreen}
          onClose={handleClose}
          open={open}
          PaperProps={{
            component: "form",
            onSubmit,
          }}
          TransitionComponent={fullScreen && ios ? Slide : Fade}
          TransitionProps={{
            appear,
            direction: "up",
          }}
        >
          <DialogTitle css={titleCss} disableTypography={!fullScreen}>
            {fullScreen ? (
              <AppBar
                onCancel={handleClose}
                onDelete={handleDelete}
                title={title}
              />
            ) : (
              <>
                <Typography component="h2" noWrap variant="h6">
                  {title}
                </Typography>
                {handleDelete && (
                  <IconButton
                    css={deleteIconButtonCss}
                    edge="end"
                    onClick={handleDelete}
                  >
                    <Delete />
                  </IconButton>
                )}
              </>
            )}
          </DialogTitle>
          <DialogContent css={contentCss}>
            <TextField
              autoFocus={!editPlayer}
              defaultValue={editPlayer?.name}
              fullWidth
              label={intl.formatMessage(messages.label)}
              margin="normal"
              name="name"
              variant="standard"
            />

            <Grid container>
              <Grid item xs={6}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">
                    <FormattedMessage
                      defaultMessage="Sex"
                      id="player.form.sex"
                    />
                  </FormLabel>
                  <RadioGroup defaultValue={editPlayer?.sex || MALE} name="sex">
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label={<GenderMale css={iconCss} />}
                      value={MALE}
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label={<GenderFemale css={iconCss} />}
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
      )}
    </ClassNames>
  );
};

export default PlayerDialog;
