import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import { noop, sortBy } from 'lodash/fp';

import { names } from '../../../../../styles/themes';

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
    paddingBottom: 0,
  },
};

class ThemeDialog extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
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

  handleEntering() {
    this.radioGroup.focus();
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
        onEntering={this.handleEntering}
        open={open}
        PaperProps={{ component: 'form', onSubmit: this.handleSubmit }}
      >
        <DialogTitle>
          <FormattedMessage id="themeDialog.title" defaultMessage="Theme" />
        </DialogTitle>
        <DialogContent className={classes.content}>
          <RadioGroup
            name="id"
            onChange={this.handleChange}
            ref={(node) => {
              this.radioGroup = node;
            }}
            value={theme.id}
          >
            {options.map((option) => (
              <FormControlLabel
                control={<Radio color="primary" />}
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </RadioGroup>
          <FormControlLabel
            checked={theme.type === 'dark'}
            control={<Checkbox color="primary" name="type" />}
            label={
              <FormattedMessage id="themeDialog.dark" defaultMessage="Dark" />
            }
            onChange={this.handleTypeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            <FormattedMessage id="themeDialog.cancel" defaultMessage="Cancel" />
          </Button>
          <Button color="primary" type="submit">
            <FormattedMessage id="themeDialog.submit" defaultMessage="OK" />
          </Button>
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
