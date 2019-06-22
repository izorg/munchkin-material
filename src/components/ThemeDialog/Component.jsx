import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
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
import { noop, sortBy } from 'lodash/fp';

import { names } from '../../styles/themes';

import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';

const useStyles = makeStyles(
  {
    content: {
      paddingBottom: 1,
    },
  },
  { name: 'ThemeDialog' },
);

const ThemeDialog = ({ onChange, onClose, onSubmit, open, theme }) => {
  const classes = useStyles();
  const intl = useIntl();

  const handleChange = (event, id) => {
    onChange({
      ...theme,
      id,
    });
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

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
    >
      <DialogTitle>
        <FormattedMessage defaultMessage="Theme" id="themeDialog.title" />
      </DialogTitle>
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

ThemeDialog.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  theme: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

ThemeDialog.defaultProps = {
  onClose: noop,
  onSubmit: noop,
  open: false,
};

ThemeDialog.displayName = 'ThemeDialog';

export default ThemeDialog;
