import React from 'react';
import { goBack, replace } from 'connected-react-router';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { flow, get, sortBy } from 'lodash/fp';

import { setTheme } from '../../../ducks/theme';
import { names } from '../../../styles/themes';
import { getQuery, stringifyQuery } from '../../../utils/location';

import CancelButton from '../../CancelButton';
import SubmitButton from '../../SubmitButton';

import themeMessages from '../messages';

const useStyles = makeStyles(
  {
    content: {
      paddingBottom: 1,
    },
  },
  { name: 'ThemeDialog' },
);

const getOpen = flow(
  getQuery,
  ({ theme }) => theme !== undefined,
);

const getTheme = createSelector(
  flow(
    getQuery,
    get('theme'),
  ),
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

  const handleChange = (event, id) => {
    onChange({
      ...theme,
      id,
    });
  };

  const onSubmit = async (selectedTheme) => {
    try {
      await dispatch(setTheme(selectedTheme));
      dispatch(goBack());
    } catch (error) {
      // no full version
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(theme);
  };

  const handleTypeChange = (event, checked) => {
    onChange({
      ...theme,
      type: checked ? 'dark' : 'light',
    });
  };

  const onClose = () => dispatch(goBack());

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
    >
      <DialogTitle>{intl.formatMessage(themeMessages.label)}</DialogTitle>
      <DialogContent className={classes.content}>
        <RadioGroup name="id" onChange={handleChange} value={theme.id}>
          {sortBy(
            ({ label }) => intl.formatMessage(label.props),
            Object.keys(names).map((value) => ({ label: names[value], value })),
          ).map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Radio autoFocus={option.value === theme.id} color="primary" />
              }
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioGroup>
        <FormControlLabel
          checked={theme.type === 'dark'}
          control={<Checkbox color="primary" name="type" />}
          label={
            <FormattedMessage defaultMessage="Dark" id="themeDialog.dark" />
          }
          onChange={handleTypeChange}
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SubmitButton />
      </DialogActions>
    </Dialog>
  );
};

ThemeDialog.displayName = 'ThemeDialog';

export default ThemeDialog;
