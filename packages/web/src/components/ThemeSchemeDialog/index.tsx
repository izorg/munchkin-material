import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  type PaletteMode,
  Radio,
  RadioGroup,
} from "@mui/material";
import { type ChangeEvent, type SyntheticEvent } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import { setTheme } from "../../ducks/theme";
import usePreviewTheme from "../../hooks/usePreviewTheme";
import themeMessages from "../../messages/theme";
import { useAppDispatch } from "../../store";
import { useGoBack } from "../../utils/location";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";

type FormValues = {
  mode: "auto" | PaletteMode;
  pureBlack: "false" | "true";
};

const ThemeSchemeDialog = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const goBack = useGoBack();

  const open = searchParams.get("scheme") !== null;

  const previewTheme = usePreviewTheme();

  const onChange = (partialTheme: Partial<FormValues>) => {
    setSearchParams(
      (searchParams) => {
        for (const [key, value] of Object.entries(partialTheme)) {
          searchParams.set(key, value);
        }

        return searchParams;
      },
      { replace: true },
    );
  };

  const onThemeModeChange = (
    _event: ChangeEvent<HTMLInputElement>,
    mode: string,
  ) => {
    onChange({
      mode: mode as FormValues["mode"],
    });
  };

  const onThemePureBlackChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({
      pureBlack: event.target.checked ? "true" : "false",
    });
  };

  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setTheme(previewTheme));

    goBack();
  };

  const onClose = () => goBack();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{intl.formatMessage(themeMessages.label)}</DialogTitle>
      <DialogContent>
        <Box component="form" id="theme-setup" onSubmit={onSubmit}>
          <FormControl component="fieldset">
            <RadioGroup
              name="mode"
              onChange={onThemeModeChange}
              value={previewTheme.mode ?? "auto"}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                label={intl.formatMessage(themeMessages.schemeAuto)}
                value="auto"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label={intl.formatMessage(themeMessages.schemeLight)}
                value="light"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label={intl.formatMessage(themeMessages.schemeDark)}
                value="dark"
              />
            </RadioGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={previewTheme.pureBlack}
                  color="primary"
                  name="pureBlack"
                  onChange={onThemePureBlackChange}
                />
              }
              label={
                <FormattedMessage
                  defaultMessage="Pure black"
                  id="themeDialog.pureBlack"
                />
              }
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SubmitButton form="theme-setup" />
      </DialogActions>
    </Dialog>
  );
};

export default ThemeSchemeDialog;
