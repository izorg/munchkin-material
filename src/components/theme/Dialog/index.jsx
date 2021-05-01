import { css } from "@emotion/react";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
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
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ component: "form", onSubmit }}
    >
      <DialogTitle>{intl.formatMessage(themeMessages.label)}</DialogTitle>
      <DialogContent
        css={css`
          padding-bottom: 1px;
        `}
      >
        <RadioGroup name="mode" onChange={onThemeModeChange} value={modeValue}>
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
              <FormattedMessage defaultMessage="Light" id="themeDialog.light" />
            }
            value="light"
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            label={
              <FormattedMessage defaultMessage="Dark" id="themeDialog.dark" />
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
        <Divider />
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
                control={
                  <Radio autoFocus={option.key === theme.id} color="primary" />
                }
                label={option.name(intl)}
                value={option.key}
              />
            ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SubmitButton />
      </DialogActions>
    </Dialog>
  );
};

export default ThemeDialog;
