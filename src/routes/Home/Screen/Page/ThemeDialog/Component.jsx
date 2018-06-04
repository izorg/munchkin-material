import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
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
  key as cthulhuKey,
  name as cthulhuName,
} from '../../../../../styles/themes/cthulhu';
import {
  key as legendsKey,
  name as legendsName,
} from '../../../../../styles/themes/legends';
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
    label: cthulhuName,
    value: cthulhuKey,
  },
  {
    label: legendsName,
    value: legendsKey,
  },
];

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
    event.preventDefault();

    this.props.onSubmit(this.state.value);
  }

  render() {
    const { value } = this.state;
    const { classes, onClose, open } = this.props;

    return (
      <Dialog
        onClose={onClose}
        onEntering={this.handleEntering}
        open={open}
        PaperProps={{ component: 'form', onSubmit: this.handleSubmit }}
      >
        <DialogTitle>
          <FormattedMessage
            id="themeDialog.title"
            defaultMessage="Select theme"
          />
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
  value: PropTypes.string.isRequired,
};

ThemeDialog.defaultProps = {
  onClose: noop,
  onSubmit: noop,
  open: false,
};

export default withStyles(styles)(ThemeDialog);
