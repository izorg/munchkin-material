import {
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
import { goBack, replace } from 'connected-react-router';
import { flow, get } from 'lodash/fp';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { setTheme } from '../../../ducks/theme';
import themes from '../../../styles/themes';
import { getQuery, stringifyQuery } from '../../../utils/location';

import CancelButton from '../../CancelButton';
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

const getOpen = flow(getQuery, ({ theme }) => theme !== undefined);

const getTheme = createSelector(
  flow(getQuery, get('theme')),
  get('theme'),
  (previewTheme, theme) => ({
    ...theme,
    ...previewTheme,
  }),
);

const ThemeDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const open = useSelector(getOpen);
  const query = useSelector(getQuery);
  const theme = useSelector(getTheme);

  const onChange = (selectedTheme) =>
    dispatch(
      replace({
        search: stringifyQuery({
          ...query,
          theme: selectedTheme,
        }),
      }),
    );

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

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(
        setTheme({
          ...theme,
          type: theme.type || undefined,
        }),
      );
      dispatch(goBack());
    } catch (error) {
      // no full version
    }
  };

  const onClose = () => dispatch(goBack());

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
