import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import {
  key as apocalypseKey,
  name as apocalypseName,
} from '../../../../../styles/themes/apocalypse';
import {
  key as bootyKey,
  name as bootyName,
} from '../../../../../styles/themes/booty';
import {
  key as chtulhuKey,
  name as chtulhuName,
} from '../../../../../styles/themes/chtulhu';
import {
  key as munchkinKey,
  name as munchkinName,
} from '../../../../../styles/themes/munchkin';

const options = [
  {
    label: munchkinName,
    value: munchkinKey,
  },
  {
    label: apocalypseName,
    value: apocalypseKey,
  },
  {
    label: bootyName,
    value: bootyKey,
  },
  {
    label: chtulhuName,
    value: chtulhuKey,
  },
];

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
    event.preventDefault();

    this.props.onSubmit(this.state.value);
  }

  render() {
    const { value } = this.state;
    const { onClose, open } = this.props;

    return (
      <Dialog
        onClose={onClose}
        onEntering={this.handleEntering}
        onFocus={() => console.trace('dialog focus')}
        open={open}
        PaperProps={{ component: 'form', onSubmit: this.handleSubmit }}
      >
        <DialogTitle>
          <FormattedMessage
            id="themeDialog.title"
            defaultMessage="Select theme"
          />
        </DialogTitle>
        <DialogContent>
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
  value: PropTypes.string.isRequired,
};

ThemeDialog.defaultProps = {
  onClose: noop,
  onSubmit: noop,
  open: false,
};

export default ThemeDialog;
