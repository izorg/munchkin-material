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
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setTheme } from "../../../ducks/theme";
import themes from "../../../theme/colors";
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from "../../../utils/location";
import CancelButton from "../../CancelButton";
import { useFullVersion } from "../../FullVersionProvider";
import SubmitButton from "../../SubmitButton";
import themeMessages from "../messages";

const ThemeDialog = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const { buyFullVersion, fullVersion } = useFullVersion();
  const goBack = useGoBack();

  const query = useLocationQuery();
  const queryTheme = query.theme;
  const stateTheme = useSelector((state) => state.present.theme);
  const themeId = stateTheme.id;
  const open = queryTheme !== undefined;

  const theme = useMemo(() => {
    let result = stateTheme;

    if (queryTheme) {
      result = {
        ...result,
        ...queryTheme,
      };

      if ("pureBlack" in queryTheme) {
        if (queryTheme.pureBlack === "false") {
          result.pureBlack = false;
        }

        if (queryTheme.pureBlack === "true") {
          result.pureBlack = true;
        }
      }
    }

    return result;
  }, [queryTheme, stateTheme]);

  const onChange = (selectedTheme) => {
    navigate(
      {
        ...location,
        search: stringifyQuery({
          ...query,
          theme: selectedTheme,
        }),
      },
      { replace: true }
    );
  };

  const onThemeIdChange = (event, id) => {
    onChange({
      ...theme,
      id,
    });
  };

  const onThemeModeChange = (event, mode) => {
    onChange({
      ...theme,
      mode,
    });
  };

  const onThemePureBlackChange = (event) => {
    onChange({
      ...theme,
      pureBlack: event.target.checked,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (theme.id !== themeId && !fullVersion) {
      try {
        await buyFullVersion();
      } catch (error) {
        return;
      }
    }

    dispatch(
      setTheme({
        ...theme,
        mode: theme.mode || undefined,
      })
    );

    goBack();
  };

  const onClose = () => goBack();

  const modeValue = theme.mode || "";

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
              value={modeValue}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                label={
                  <FormattedMessage
                    defaultMessage="System Default"
                    id="themeDialog.auto"
                  />
                }
                value=""
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
                  checked={theme.pureBlack}
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
            <RadioGroup name="id" onChange={onThemeIdChange} value={theme.id}>
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
