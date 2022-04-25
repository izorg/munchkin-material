import { mdiDelete, mdiGenderFemale, mdiGenderMale } from "@mdi/js";
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
  SvgIcon,
  TextField,
  type Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { type FormEvent, useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { addPlayerToList } from "../../ducks/playerList";
import { addPlayer, updatePlayer } from "../../ducks/players";
import { useAppDispatch } from "../../store";
import availableColors from "../../utils/availableColors";
import createPlayer from "../../utils/createPlayer";
import getRandomMaterialColor from "../../utils/getRandomMaterialColor";
import { useGoBack } from "../../utils/location";
import { ios } from "../../utils/platforms";
import { type Player, Sex } from "../../utils/types";
import useDeletePlayers from "../../utils/useDeletePlayers";
import usePresentSelector from "../../utils/usePresentSelector";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";

import AppBar from "./AppBar";
import ColorPicker from "./ColorPicker";

let appear = false;

const PlayerDialog = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const location = useLocation();

  const deletePlayers = useDeletePlayers();
  const goBack = useGoBack();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const open = searchParams.get("player") !== null;
  const players = usePresentSelector((state) => state.players);

  const queryPlayer = searchParams.get("player");

  const previousPlayerRef = useRef(
    queryPlayer ? players[queryPlayer] : undefined
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
          .filter(
            (color): color is typeof availableColors[number] =>
              color !== undefined
          )
      ),
    [players]
  );

  const fullScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg")
  );

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const values: Partial<Player> = Object.fromEntries(formData);

    if (!values.name?.trim()) {
      handleClose();

      return;
    }

    if (editPlayer) {
      const equal = Object.keys(values).every(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

  const title = editPlayer
    ? intl.formatMessage({
        defaultMessage: "Edit munchkin",
        id: "player.form.titleEdit",
      })
    : intl.formatMessage({
        defaultMessage: "New munchkin",
        id: "player.form.title",
      });

  return (
    <Dialog
      disableRestoreFocus
      fullScreen={fullScreen}
      hideBackdrop={fullScreen}
      onClose={handleClose}
      open={open}
      PaperProps={{
        component: "form",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onSubmit,
        sx: (theme) => ({
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : theme.palette.background.paper,
          minWidth: "320px",

          [theme.breakpoints.up("lg")]: {
            backgroundColor: theme.palette.background.paper,
          },
        }),
      }}
      sx={{
        height: "inherit", // scrolling body in cordova for small screen height
      }}
      TransitionComponent={fullScreen && ios ? Slide : Fade}
      TransitionProps={{
        appear,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        direction: "up",
      }}
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
          <AppBar
            onCancel={handleClose}
            onDelete={handleDelete}
            title={title}
          />
        ) : (
          <>
            <Typography component="span" noWrap variant="h6">
              {title}
            </Typography>
            {handleDelete && (
              <IconButton
                edge="end"
                onClick={handleDelete}
                sx={{
                  marginLeft: "8px",
                  padding: "4px",
                }}
              >
                <SvgIcon>
                  <path d={mdiDelete} />
                </SvgIcon>
              </IconButton>
            )}
          </>
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
        <TextField
          autoFocus={!editPlayer}
          defaultValue={editPlayer?.name}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Name",
            id: "player.form.namePlaceholder",
          })}
          margin="normal"
          name="name"
        />

        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                {intl.formatMessage({
                  defaultMessage: "Sex",
                  id: "player.form.sex",
                })}
              </FormLabel>
              <RadioGroup defaultValue={editPlayer?.sex || Sex.Male} name="sex">
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
                {intl.formatMessage({
                  defaultMessage: "Color",
                  id: "player.form.color",
                })}
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
            {intl.formatMessage({
              defaultMessage: "Save",
              id: "player.form.save",
            })}
          </SubmitButton>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PlayerDialog;
