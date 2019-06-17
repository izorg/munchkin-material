import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import { MAX_EPIC_LEVEL, MAX_LEVEL, MIN_LEVEL } from '../../utils/levelLimit';

import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';

export const DEFAULT_MUNCHKIN_LIMIT = 'default';
export const EPIC_MUNCHKIN_LIMIT = 'epic';
export const NO_LIMIT = 'no-limit';

const useStyles = makeStyles(
  {
    content: {
      paddingBottom: 1,
    },
  },
  { name: 'LevelLimitDialog' },
);

const LevelLimitDialog = ({
  defaultValue,
  onClose,
  onSubmit,
  open,
  ...rest
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(defaultValue);

  const handleChange = (event, levelLimit) => {
    setValue(levelLimit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(value);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      {...rest}
    >
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Level limit"
          id="levelLimitDialog.title"
        />
      </DialogTitle>
      <DialogContent className={classes.content}>
        <RadioGroup name="levelLimit" onChange={handleChange} value={value}>
          <FormControlLabel
            control={<Radio autoFocus={value === NO_LIMIT} color="primary" />}
            label={
              <FormattedMessage
                defaultMessage="No limit"
                id="levelLimitDialog.noLimit"
              />
            }
            value={NO_LIMIT}
          />
          <FormControlLabel
            control={
              <Radio
                autoFocus={value === DEFAULT_MUNCHKIN_LIMIT}
                color="primary"
              />
            }
            label={
              <FormattedMessage
                defaultMessage="Munchkin ({minLevel} - {maxLevel})"
                id="levelLimitDialog.defaultLimit"
                values={{
                  minLevel: MIN_LEVEL,
                  maxLevel: MAX_LEVEL,
                }}
              />
            }
            value={DEFAULT_MUNCHKIN_LIMIT}
          />
          <FormControlLabel
            control={
              <Radio
                autoFocus={value === EPIC_MUNCHKIN_LIMIT}
                color="primary"
              />
            }
            label={
              <FormattedMessage
                defaultMessage="Epic Munchkin ({minLevel} - {maxLevel})"
                id="levelLimitDialog.epic"
                values={{
                  maxLevel: MAX_EPIC_LEVEL,
                  minLevel: MIN_LEVEL,
                }}
              />
            }
            value={EPIC_MUNCHKIN_LIMIT}
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SubmitButton />
      </DialogActions>
    </Dialog>
  );
};

LevelLimitDialog.propTypes = {
  defaultValue: PropTypes.oneOf([
    DEFAULT_MUNCHKIN_LIMIT,
    EPIC_MUNCHKIN_LIMIT,
    NO_LIMIT,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

LevelLimitDialog.defaultProps = {
  open: false,
};

export default LevelLimitDialog;
