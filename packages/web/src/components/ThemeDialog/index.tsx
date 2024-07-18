import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { captureException } from "@sentry/react";
import { type ChangeEvent, type SyntheticEvent } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

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
};

const ThemeDialog = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const { buyFullVersion, fullVersion } = useFullVersion();
  const goBack = useGoBack();

  const currentThemeId = usePresentSelector((state) => state.theme.id);

  const open = searchParams.get("theme") !== null;

  const previewTheme = usePreviewTheme();

  const onChange = (partialTheme: Partial<FormValues>) => {
    setSearchParams(
      (searchParams) => {
        for (const [key, value] of Object.entries(partialTheme)) {
          searchParams.set(key, value);
        }

        return searchParams;
      },
      {
        replace: true,
      },
    );
  };

  const onThemeIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    onChange({
      id,
    });
  };

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (previewTheme.id !== currentThemeId && !fullVersion) {
      try {
        await buyFullVersion();
      } catch (error) {
        captureException(error);

        return;
      }
    }

    dispatch(setTheme(previewTheme));

    goBack();
  };

  const onClose = () => goBack();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{intl.formatMessage(themeMessages.color)}</DialogTitle>
      <DialogContent>
        {/* eslint-disable-next-line sonarjs/no-misused-promises */}
        <Box component="form" id="theme-setup" onSubmit={onSubmit}>
          <FormControl component="fieldset">
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
                    control={<Radio color="primary" />}
                    key={option.key}
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
