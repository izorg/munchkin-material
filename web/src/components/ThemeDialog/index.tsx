import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  type PaletteMode,
  Radio,
  RadioGroup,
} from "@mui/material";
import { type ChangeEvent, type SyntheticEvent, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import { setTheme } from "../../ducks/theme";
import usePresentSelector from "../../hooks/usePresentSelector";
import usePreviewTheme from "../../hooks/usePreviewTheme";
import themeMessages from "../../messages/theme";
import { useAppDispatch } from "../../store";
import themes from "../../theme/colors";
import { useFullVersion } from "../../utils/fullVersionContext";
import { useGoBack } from "../../utils/location";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";

type FormValues = {
  id: string;
  mode: PaletteMode | "auto";
  pureBlack: "false" | "true";
};

const ThemeDialog = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const { buyFullVersion, fullVersion } = useFullVersion();
  const goBack = useGoBack();

  const currentThemeId = usePresentSelector((state) => state.theme.id);

  const open = useMemo(
    () => new URLSearchParams(location.search).get("theme") !== null,
    [location.search]
  );

  const previewTheme = usePreviewTheme();

  const onChange = (partialTheme: Partial<FormValues>) => {
    const searchParams = new URLSearchParams(location.search);

    for (const [key, value] of Object.entries(partialTheme)) {
      searchParams.set(key, value);
    }

    const search = `?${searchParams.toString()}`;

    navigate({ search }, { replace: true });
  };

  const onThemeIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    onChange({
      id,
    });
  };

  const onThemeModeChange = (
    event: ChangeEvent<HTMLInputElement>,
    mode: string
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

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (previewTheme.id !== currentThemeId && !fullVersion) {
      try {
        await buyFullVersion();
      } catch {
        return;
      }
    }

    dispatch(setTheme(previewTheme));

    goBack();
  };

  const onClose = () => goBack();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{intl.formatMessage(themeMessages.label)}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="theme-setup"
          onSubmit={onSubmit}
          sx={{
            marginLeft: -2,
            marginTop: -2,
          }}
        >
          <FormControl
            component="fieldset"
            sx={{
              marginLeft: 2,
              marginTop: 2,
            }}
          >
            <FormLabel component="legend">
              <FormattedMessage defaultMessage="Mode" id="theme.mode" />
            </FormLabel>
            <RadioGroup
              name="mode"
              onChange={onThemeModeChange}
              value={previewTheme.mode || "auto"}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                label={
                  <FormattedMessage
                    defaultMessage="System Default"
                    id="themeDialog.auto"
                  />
                }
                value="auto"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label={
                  <FormattedMessage
                    defaultMessage="Light"
                    id="themeDialog.light"
                  />
                }
                value="light"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label={
                  <FormattedMessage
                    defaultMessage="Dark"
                    id="themeDialog.dark"
                  />
                }
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
          <FormControl
            component="fieldset"
            sx={{
              marginLeft: 2,
              marginTop: 2,
            }}
          >
            <FormLabel component="legend">
              <FormattedMessage defaultMessage="Color" id="theme.color" />
            </FormLabel>
            <RadioGroup
              name="id"
              onChange={onThemeIdChange}
              value={previewTheme.id}
            >
              {Object.values(themes)
                .sort((t1, t2) => {
                  const a = t1.name(intl);
                  const b = t2.name(intl);

                  if (a < b) {
                    return -1;
                  }

                  if (a > b) {
                    return 1;
                  }

                  return 0;
                })
                .map((option) => (
                  <FormControlLabel
                    key={option.key}
                    control={<Radio color="primary" />}
                    label={option.name(intl)}
                    value={option.key}
                  />
                ))}
            </RadioGroup>
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

export default ThemeDialog;
