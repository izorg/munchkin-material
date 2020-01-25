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
import { goBack } from 'connected-react-router';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { setEpic, setLevelLimit } from '../../../ducks/app';
import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from '../../../utils/levelLimit';
import { getQuery } from '../../../utils/location';

import CancelButton from '../../CancelButton';
import SubmitButton from '../../SubmitButton';

import levelLimitMessages from '../messages';

const displayName = 'LevelLimitDialog';

export const DEFAULT_MUNCHKIN_LIMIT = 'default';
export const EPIC_MUNCHKIN_LIMIT = 'epic';
export const NO_LIMIT = 'no-limit';

const useStyles = makeStyles(
  {
    content: {
      paddingBottom: 1,
    },
  },
  { name: displayName },
);

const getDefaultValue = createSelector(
  (state) => state.app.levelLimit,
  (state) => state.app.epic,
  (levelLimit, epic) => {
    if (levelLimit) {
      if (epic) {
        return EPIC_MUNCHKIN_LIMIT;
      }

      return DEFAULT_MUNCHKIN_LIMIT;
    }

    return NO_LIMIT;
  },
);

const getOpen = (state) => getQuery(state).levelLimit !== undefined;

const LevelLimitDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const defaultValue = useSelector(getDefaultValue);
  const [value, setValue] = useState(defaultValue);

  const open = useSelector(getOpen);

  const onClose = () => dispatch(goBack());

  const onChange = (event, levelLimit) => {
    setValue(levelLimit);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    switch (value) {
      case NO_LIMIT:
        dispatch(setLevelLimit(false));
        break;

      case DEFAULT_MUNCHKIN_LIMIT:
        dispatch(setEpic(false));
        dispatch(setLevelLimit(true));
        break;

      case EPIC_MUNCHKIN_LIMIT:
        dispatch(setEpic(true));
        dispatch(setLevelLimit(true));
        break;

      default:
        break;
    }

    dispatch(goBack());
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit,
      }}
      {...props}
    >
      <DialogTitle>{intl.formatMessage(levelLimitMessages.label)}</DialogTitle>
      <DialogContent className={classes.content}>
        <RadioGroup name="levelLimit" onChange={onChange} value={value}>
          <FormControlLabel
            control={<Radio autoFocus={value === NO_LIMIT} color="primary" />}
            label={intl.formatMessage(levelLimitMessages.none)}
            value={NO_LIMIT}
          />
          <FormControlLabel
            control={
              <Radio
                autoFocus={value === DEFAULT_MUNCHKIN_LIMIT}
                color="primary"
              />
            }
            label={intl.formatMessage(levelLimitMessages.munchkin, {
              minLevel: MIN_LEVEL,
              maxLevel: MAX_LEVEL,
            })}
            value={DEFAULT_MUNCHKIN_LIMIT}
          />
          <FormControlLabel
            control={
              <Radio
                autoFocus={value === EPIC_MUNCHKIN_LIMIT}
                color="primary"
              />
            }
            label={intl.formatMessage(levelLimitMessages.epic, {
              maxLevel: MAX_EPIC_LEVEL,
              minLevel: MIN_LEVEL,
            })}
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

LevelLimitDialog.displayName = displayName;

export default LevelLimitDialog;
