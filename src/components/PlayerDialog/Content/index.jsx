import React, { createRef, Fragment, PureComponent } from 'react';
import { Field } from 'react-final-form';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SexFemale from 'mdi-material-ui/GenderFemale';
import SexMale from 'mdi-material-ui/GenderMale';
import { FEMALE, MALE } from 'munchkin-core';

import ColorPicker from '../ColorPicker';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = {
  label: {
    marginTop: 0,
  },

  icon: {
    verticalAlign: 'middle',
  },
};

const renderColorPicker = ({ input, ...props }) => (
  <ColorPicker {...input} {...props} />
);

const renderRadio = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    input: { checked, name, onChange, value, ...inputProps },
  } = props;

  return (
    <Radio
      checked={checked}
      color="primary"
      inputProps={inputProps}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};

const renderTextField = ({ input, meta, ...props }) => (
  <TextField {...input} {...props} />
);

class PlayerForm extends PureComponent {
  constructor(props) {
    super(props);

    this.nameRef = createRef();
  }

  render() {
    const { autoFocus, classes, intl } = this.props;

    return (
      <Fragment>
        <Field
          autoComplete="off"
          autoFocus={autoFocus}
          component={renderTextField}
          fullWidth
          inputRef={this.nameRef}
          margin="normal"
          name="name"
          placeholder={intl.formatMessage(messages.label)}
        />

        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage id="player.form.sex" defaultMessage="Sex" />
              </FormLabel>
              <FormControlLabel
                classes={{
                  label: classes.label,
                }}
                control={
                  <Field component={renderRadio} name="sex" type="radio" />
                }
                label={<SexMale className={classes.icon} />}
                value={MALE}
              />
              <FormControlLabel
                classes={{
                  label: classes.label,
                }}
                control={
                  <Field component={renderRadio} name="sex" type="radio" />
                }
                label={<SexFemale className={classes.icon} />}
                value={FEMALE}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl margin="normal">
              <FormLabel>
                <FormattedMessage
                  id="player.form.color"
                  defaultMessage="Color"
                />
              </FormLabel>
              <Field component={renderColorPicker} name="color" />
            </FormControl>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

PlayerForm.propTypes = {
  autoFocus: PropTypes.bool,
  intl: intlShape.isRequired,
};

PlayerForm.defaultProps = {
  autoFocus: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(PlayerForm);
