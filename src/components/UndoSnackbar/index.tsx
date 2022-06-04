import {
  Button,
  Fade,
  Snackbar,
  type SnackbarCloseReason,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { ActionCreators } from "redux-undo";

import { useAppDispatch, useAppSelector } from "../../store";
import { useUndo } from "../UndoProvider";

const UndoSnackbar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const open = useAppSelector((state) => state.past.length > 0);

  const onClose = (event: unknown, reason: SnackbarCloseReason | "undo") => {
    if (reason === "undo") {
      dispatch(ActionCreators.undo());
    }

    dispatch(ActionCreators.clearHistory());
  };

  const { message, setMessage } = useUndo();

  return (
    <Snackbar
      action={
        <Button color="secondary" onClick={(event) => onClose(event, "undo")}>
          <FormattedMessage defaultMessage="Undo" id="undo" />
        </Button>
      }
      autoHideDuration={8000}
      message={message}
      onClose={onClose}
      open={open}
      sx={{
        bottom: {
          sm: 28,
          xs: 88,
        },
      }}
      TransitionComponent={mdDown ? Fade : undefined}
      TransitionProps={{
        onExited: () => setMessage(null),
      }}
    />
  );
};

export default UndoSnackbar;
