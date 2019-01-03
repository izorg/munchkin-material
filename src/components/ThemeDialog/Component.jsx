import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  withStyles,
} from '@material-ui/core';
import { noop, sortBy } from 'lodash/fp';

import { names } from '../../styles/themes';

import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';

const optionsSelector = createSelector(
  ({ intl }) => intl,
  (intl) =>
    sortBy(
      ({ label }) => intl.formatMessage(label.props),
      Object.keys(names).map((value) => ({ label: names[value], value })),
    ),
);

const styles = {
  content: {
    paddingBottom: 1,
  },
};

class ThemeDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleChange(event, id) {
    this.setState(({ theme }) => ({
      theme: {
        ...theme,
        id,
      },
    }));
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const { theme } = this.state;

    event.preventDefault();

    onSubmit(theme);
  }

  handleTypeChange(event, checked) {
    this.setState(({ theme }) => ({
      theme: {
        ...theme,
        type: checked ? 'dark' : 'light',
      },
    }));
  }

  render() {
    const { theme } = this.state;
    const { classes, onClose, open, options } = this.props;

    return (
      <Dialog
        onClose={onClose}
        open={open}
        PaperProps={{ component: 'form', onSubmit: this.handleSubmit }}
      >
        <DialogTitle>
          <FormattedMessage defaultMessage="Theme" id="themeDialog.title" />
        </DialogTitle>
        <DialogContent className={classes.content}>
          <RadioGroup name="id" onChange={this.handleChange} value={theme.id}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Radio
                    autoFocus={option.value === theme.id}
                    color="primary"
                  />
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
            onChange={this.handleTypeChange}
          />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <SubmitButton />
        </DialogActions>
      </Dialog>
    );
  }
}

ThemeDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
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

export default compose(
  injectIntl,
  withProps(
    createStructuredSelector({
      options: optionsSelector,
    }),
  ),
  withStyles(styles),
)(ThemeDialog);
