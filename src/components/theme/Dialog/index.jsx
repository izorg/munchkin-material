import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setTheme } from '../../../ducks/theme';
import themes from '../../../styles/themes';
import {
  stringifyQuery,
  useGoBack,
  useLocationQuery,
} from '../../../utils/location';
import CancelButton from '../../CancelButton';
import { useFullVersion } from '../../FullVersionProvider';
import SubmitButton from '../../SubmitButton';
import themeMessages from '../messages';

const displayName = 'ThemeDialog';

const useStyles = makeStyles(
  {
    content: {
      paddingBottom: 1,
    },
  },
  { name: displayName },
);

const ThemeDialog = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();

  const { buyFullVersion, fullVersion } = useFullVersion();
  const goBack = useGoBack();

  const themeId = useSelector((state) => state.present.theme.id);

  const query = useLocationQuery();
  const queryTheme = query.theme;
  const stateTheme = useSelector((state) => state.present.theme);
  const open = queryTheme !== undefined;

  const theme = useMemo(() => {
    let result = stateTheme;

    if (queryTheme) {
      result = {
        ...result,
        ...queryTheme,
      };

      if ('pureBlack' in queryTheme) {
        if (queryTheme.pureBlack === 'false') {
          result.pureBlack = false;
        }

        if (queryTheme.pureBlack === 'true') {
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
      { replace: true },
    );
  };

  const onThemeIdChange = (event, id) => {
    onChange({
      ...theme,
      id,
    });
  };

  const onThemeTypeChange = (event, type) => {
    onChange({
      ...theme,
      type,
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
        type: theme.type || undefined,
      }),
    );

    goBack();
  };

  const onClose = () => goBack();

  const typeValue = theme.type || '';

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ component: 'form', onSubmit }}
    >
      <DialogTitle>{intl.formatMessage(themeMessages.label)}</DialogTitle>
      <DialogContent className={classes.content}>
        <RadioGroup name="type" onChange={onThemeTypeChange} value={typeValue}>
          {window.matchMedia('(prefers-color-scheme)').matches && (
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
          )}
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
              const a = intl.formatMessage(t1.messages.name);
              const b = intl.formatMessage(t2.messages.name);

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
                label={intl.formatMessage(option.messages.name)}
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

ThemeDialog.displayName = displayName;

export default ThemeDialog;
