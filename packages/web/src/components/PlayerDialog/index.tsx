import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

import usePresentSelector from "../../hooks/usePresentSelector";
import { useGoBack } from "../../utils/location";

import { PlayerDialogActions } from "./PlayerDialogActions";
import { PlayerDialogTitle } from "./PlayerDialogTitle";
import { PlayerDialogTransition } from "./PlayerDialogTransition";
import { PlayerForm } from "./PlayerForm";
import { useFullScreen } from "./useFullScreen";

const PlayerDialog = () => {
  const goBack = useGoBack();
  const [searchParams] = useSearchParams();
  const open = searchParams.get("player") !== null;
  const players = usePresentSelector((state) => state.players);

  const queryPlayer = searchParams.get("player");

  const previousPlayerRef = useRef(
    queryPlayer ? players[queryPlayer] : undefined,
  );

  useEffect(() => {
    if (open) {
      previousPlayerRef.current = queryPlayer
        ? players[queryPlayer]
        : undefined;
    }
  }, [open, players, queryPlayer]);

  const fullScreen = useFullScreen();

  return (
    <Dialog
      disableRestoreFocus
      fullScreen={fullScreen}
      hideBackdrop={fullScreen}
      onClose={goBack}
      open={open}
      slotProps={{
        paper: {
          elevation: fullScreen ? 0 : 1,
          sx: {
            minWidth: {
              lg: "320px",
            },
          },
        },
      }}
      slots={{ transition: PlayerDialogTransition }}
      sx={{
        height: "inherit", // scrolling body in cordova for small screen height
      }}
    >
      <PlayerDialogTitle />
      <DialogContent
        sx={[
          (theme) => ({
            paddingLeft: "calc(24px + var(--inset-left)) /*! @noflip */",
            paddingRight: "calc(24px + var(--inset-right)) /*! @noflip */",

            [theme.breakpoints.up("md")]: {
              alignSelf: "center",
              width: "600px",
            },
          }),
          fullScreen && {
            paddingBottom: "calc(20px + var(--keyboard-height))",
          },
        ]}
      >
        <PlayerForm />
      </DialogContent>
      {!fullScreen && <PlayerDialogActions />}
    </Dialog>
  );
};

export default PlayerDialog;
