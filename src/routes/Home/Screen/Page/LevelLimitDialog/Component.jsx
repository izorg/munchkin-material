import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash/fp';

import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from '../../../../../utils/levelLimit';

import CancelButton from '../../../../../components/CancelButton';
import SubmitButton from '../../../../../components/SubmitButton';

export const DEFAULT_MUNCHKIN_LIMIT = 'default';
export const EPIC_MUNCHKIN_LIMIT = 'epic';
export const NO_LIMIT = 'no-limit';

const styles = {
  content: {
    paddingBottom: 0,
  },
};

class LevelDialog extends PureComponent {
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
            id="levelLimitDialog.title"
            defaultMessage="Level limit"
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
                  id="levelLimitDialog.noLimit"
                  defaultMessage="No limit"
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
                  id="levelLimitDialog.defaultLimit"
                  defaultMessage="Munchkin ({minLevel} - {maxLevel})"
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
                  id="levelLimitDialog.epic"
                  defaultMessage="Epic Munchkin ({minLevel} - {maxLevel})"
                  values={{
                    minLevel: MIN_LEVEL,
                    maxLevel: MAX_EPIC_LEVEL,
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
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

LevelDialog.defaultProps = {
  onClose: noop,
  onSubmit: noop,
  open: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(LevelDialog);
