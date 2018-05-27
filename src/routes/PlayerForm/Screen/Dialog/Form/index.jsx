import React, { PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/sex';
import { noop } from 'lodash';

import SexFemale from '../../../../../components/icons/sex/Female';
import SexMale from '../../../../../components/icons/sex/Male';
import { sexProp } from '../../../../../utils/propTypes';

import ColorPicker from '../ColorPicker';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = (theme) => ({
  icon: {
    fontSize: theme.typography.pxToRem(24),
  },
});

class PlayerForm extends PureComponent {
  static renderColorPicker({ input, ...props }) {
    return <ColorPicker {...input} {...props} />;
  }

  static renderRadio(props) {
    const {
      input: { checked, name, onChange, value, ...restInput },
    } = props;

    return (
      <Radio
        checked={checked}
        color="primary"
        inputProps={restInput}
        name={name}
        onChange={onChange}
        value={value}
      />
    );
  }

  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  constructor(props) {
    super(props);

    this.state = {
      initialValues: props.initialValues,
    };
  }

  render() {
    const { autoFocus, classes, id, intl, onSubmit } = this.props;
    const { initialValues } = this.state;

    return (
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        subscription={{ submitting: true }}
        render={({ handleSubmit }) => (
          <form autoComplete="off" id={id} noValidate onSubmit={handleSubmit}>
            <Field
              autoFocus={autoFocus}
              component={PlayerForm.renderTextField}
              fullWidth
              margin="normal"
              name="name"
              placeholder={intl.formatMessage(messages.label)}
            />

            <Grid container>
              <Grid item xs={6}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">
                    <FormattedMessage
                      id="player.form.sex"
                      defaultMessage="Sex"
                    />
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Field
                        component={PlayerForm.renderRadio}
                        name="sex"
                        type="radio"
                      />
                    }
                    label={<SexMale className={classes.icon} />}
                    value={MALE}
                  />
                  <FormControlLabel
                    control={
                      <Field
                        component={PlayerForm.renderRadio}
                        name="sex"
                        type="radio"
                      />
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
                  <Field
                    component={PlayerForm.renderColorPicker}
                    name="color"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      />
    );
  }
}

PlayerForm.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string,
    sex: sexProp.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func,
};

PlayerForm.defaultProps = {
  autoFocus: false,
  onSubmit: noop,
};

export default compose(injectIntl, withStyles(styles))(PlayerForm);
