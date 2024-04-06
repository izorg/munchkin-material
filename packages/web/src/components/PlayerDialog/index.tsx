import { mdiGenderFemale, mdiGenderMale } from "@mdi/js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { type FormEvent, useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import { addPlayerToList } from "../../ducks/playerList";
import { addPlayer, updatePlayer } from "../../ducks/players";
import useDeletePlayers from "../../hooks/useDeletePlayers";
import usePresentSelector from "../../hooks/usePresentSelector";
import { useAppDispatch } from "../../store";
import { type AvailableColor } from "../../utils/availableColors";
import createPlayer from "../../utils/createPlayer";
import getRandomMaterialColor from "../../utils/getRandomMaterialColor";
import { useGoBack } from "../../utils/location";
import shallowEqual from "../../utils/shallowEqual";
import { type Player, Sex } from "../../utils/types";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";

import AppBar from "./AppBar";
import ColorPicker from "./ColorPicker";
import formId from "./formId";
import { PlayerDialogTransition } from "./PlayerDialogTransition";
import { useFullScreen } from "./useFullScreen";

const PlayerDialog = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const deletePlayers = useDeletePlayers();
  const goBack = useGoBack();
  const [searchParams] = useSearchParams();
  const open = searchParams.get("player") !== null;
  const players = usePresentSelector((state) => state.players);

  const queryPlayer = searchParams.get("player");

  const previousPlayerRef = useRef(
    queryPlayer ? players[queryPlayer] : undefined,
  );

  const editPlayer = useMemo(() => {
    if (open) {
      return queryPlayer ? players[queryPlayer] : undefined;
    }

    return previousPlayerRef.current;
  }, [open, players, queryPlayer]);

  useEffect(() => {
    if (open) {
      previousPlayerRef.current = queryPlayer
        ? players[queryPlayer]
        : undefined;
    }
  }, [open, players, queryPlayer]);

  const randomColor = useMemo(
    () =>
      getRandomMaterialColor(
        Object.values(players)
          .map((player) => player.color)
          .filter((color): color is AvailableColor => color !== undefined),
      ),
    [players],
  );

  const fullScreen = useFullScreen();

  const handleDelete = editPlayer
    ? () => {
        deletePlayers([editPlayer.id]);
        goBack();
      }
    : undefined;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const formValues: Partial<Player> = Object.fromEntries(formData);

    if (!formValues.name?.trim()) {
      goBack();

      return;
    }

    if (editPlayer) {
      const player: Player = {
        ...editPlayer,
        ...formValues,
      };

      if (shallowEqual(editPlayer, player)) {
        goBack();

        return;
      }

      dispatch(updatePlayer(player));
    } else {
      const player = createPlayer(formValues);

      dispatch(addPlayer(player));
      dispatch(addPlayerToList(player.id));
    }

    goBack();
  };

  const title = editPlayer
    ? // eslint-disable-next-line formatjs/enforce-id
      intl.formatMessage({
        defaultMessage: "Edit munchkin",
        id: "player.form.titleEdit",
      })
    : // eslint-disable-next-line formatjs/enforce-id
      intl.formatMessage({
        defaultMessage: "New munchkin",
        id: "player.form.title",
      });

  return (
    <Dialog
      disableRestoreFocus
      fullScreen={fullScreen}
      hideBackdrop={fullScreen}
      onClose={goBack}
      open={open}
      PaperProps={{
        elevation: fullScreen ? 0 : 1,
        sx: {
          minWidth: {
            lg: "320px",
          },
        },
      }}
      sx={{
        height: "inherit", // scrolling body in cordova for small screen height
      }}
      TransitionComponent={PlayerDialogTransition}
    >
      <DialogTitle
        sx={(theme) => ({
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",

          [theme.breakpoints.down("lg")]: {
            display: "block",
            padding: 0,
          },
        })}
      >
        {fullScreen ? (
          <AppBar onCancel={goBack} onDelete={handleDelete} title={title} />
        ) : (
          <Typography component="span" noWrap variant="h6">
            {title}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent
        sx={(theme) => ({
          "@supports (padding: max(0px))": {
            paddingLeft: "max(24px, env(safe-area-inset-left))",
            paddingRight: "max(24px, env(safe-area-inset-right))",
          },

          [theme.breakpoints.up("md")]: {
            alignSelf: "center",
            width: "600px",
          },
        })}
      >
        <form id={formId} onSubmit={onSubmit}>
          <TextField
            autoFocus={!editPlayer}
            defaultValue={editPlayer?.name}
            fullWidth
            label={
              // eslint-disable-next-line formatjs/enforce-id
              intl.formatMessage({
                defaultMessage: "Name",
                id: "player.form.namePlaceholder",
              })
            }
            margin="normal"
            name="name"
          />

          <Grid container>
            <Grid item xs={6}>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">
                  {
                    // eslint-disable-next-line formatjs/enforce-id
                    intl.formatMessage({
                      defaultMessage: "Sex",
                      id: "player.form.sex",
                    })
                  }
                </FormLabel>
                <RadioGroup
                  defaultValue={editPlayer?.sex ?? Sex.Male}
                  name="sex"
                >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label={
                      <SvgIcon sx={{ verticalAlign: "middle" }}>
                        <path d={mdiGenderMale} />
                      </SvgIcon>
                    }
                    value={Sex.Male}
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label={
                      <SvgIcon sx={{ verticalAlign: "middle" }}>
                        <path d={mdiGenderFemale} />
                      </SvgIcon>
                    }
                    value={Sex.Female}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl margin="normal">
                <FormLabel>
                  {
                    // eslint-disable-next-line formatjs/enforce-id
                    intl.formatMessage({
                      defaultMessage: "Color",
                      id: "player.form.color",
                    })
                  }
                </FormLabel>
                <ColorPicker
                  defaultValue={editPlayer?.color ?? randomColor}
                  name="color"
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      {!fullScreen && (
        <DialogActions>
          {editPlayer && (
            <Button onClick={handleDelete} sx={{ marginRight: "auto" }}>
              {
                // eslint-disable-next-line formatjs/enforce-id
                intl.formatMessage({
                  defaultMessage: "Delete",
                  id: "player.form.delete",
                })
              }
            </Button>
          )}
          <CancelButton onClick={goBack} />
          <SubmitButton form={formId}>
            {
              // eslint-disable-next-line formatjs/enforce-id
              intl.formatMessage({
                defaultMessage: "Save",
                id: "player.form.save",
              })
            }
          </SubmitButton>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PlayerDialog;
