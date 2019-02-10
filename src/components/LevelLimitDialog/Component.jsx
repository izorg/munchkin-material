import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  withStyles,
} from '@material-ui/core';

import { MAX_EPIC_LEVEL, MAX_LEVEL, MIN_LEVEL } from '../../utils/levelLimit';

import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';

export const DEFAULT_MUNCHKIN_LIMIT = 'default';
export const EPIC_MUNCHKIN_LIMIT = 'epic';
export const NO_LIMIT = 'no-limit';

const styles = {
  content: {
    paddingBottom: 1,
  },
};

class LevelDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    const { onSubmit } = this.props;

    event.preventDefault();

    onSubmit(value);
  }

  render() {
    const { value } = this.state;
    const { classes, onClose, onSubmit, open, ...rest } = this.props;

    return (
      <Dialog
        onClose={onClose}
        open={open}
        PaperProps={{ component: 'form', onSubmit: this.handleSubmit }}
        {...rest}
      >
        <DialogTitle>
          <FormattedMessage
            defaultMessage="Level limit"
            id="levelLimitDialog.title"
          />
        </DialogTitle>
        <DialogContent className={classes.content}>
          <RadioGroup
            name="levelLimit"
            onChange={this.handleChange}
            value={value}
          >
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
  }
}

LevelDialog.propTypes = {
  defaultValue: PropTypes.oneOf([
    DEFAULT_MUNCHKIN_LIMIT,
    EPIC_MUNCHKIN_LIMIT,
    NO_LIMIT,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

LevelDialog.defaultProps = {
  open: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(LevelDialog);
