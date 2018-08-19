import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import { noop, sortBy } from 'lodash';

import { names } from '../../../../../styles/themes';

const optionsSelector = createSelector(
  ({ intl }) => intl,
  (intl) =>
    sortBy(
      Object.keys(names).map((value) => ({ label: names[value], value })),
      ({ label }) => intl.formatMessage(label.props),
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
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleEntering() {
    this.radioGroup.focus();
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const { value } = this.state;

    event.preventDefault();

    onSubmit(value);
  }

  render() {
    const { value } = this.state;
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
            name="theme"
            onChange={this.handleChange}
            ref={(node) => {
              this.radioGroup = node;
            }}
            value={value}
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
  value: PropTypes.string.isRequired,
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
