import React, { PureComponent } from 'react';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';

import GenderFemale from '../../../../components/icons/gender/Female';
import GenderMale from '../../../../components/icons/gender/Male';

import ColorPicker from './ColorPicker';

export const form = 'player';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

class PlayerForm extends PureComponent {
  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  static renderRadioGroup({ input, ...props }) {
    return <RadioGroup {...input} {...props} />;
  }

  render() {
    const { handleSubmit, intl, newPlayer } = this.props;

    return (
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Field
          autoFocus={newPlayer}
          component={PlayerForm.renderTextField}
          fullWidth
          margin="normal"
          name="name"
          placeholder={intl.formatMessage(messages.label)}
        />

        <Grid container>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage
                  id="player.form.gender"
                  defaultMessage="Gender"
                />
              </FormLabel>
              <Field component={PlayerForm.renderRadioGroup} name="gender">
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={<GenderMale />}
                  value={MALE}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  label={<GenderFemale />}
                  value={FEMALE}
                />
              </Field>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2} lg={1}>
            <FormControl margin="normal">
              <FormLabel>
                <FormattedMessage
                  id="player.form.color"
                  defaultMessage="Color"
                />
              </FormLabel>
              <Field component={ColorPicker} name="color" />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    );
  }
}

PlayerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  newPlayer: PropTypes.bool,
};

PlayerForm.defaultProps = {
  newPlayer: true,
};

export default compose(reduxForm({ form }), injectIntl)(PlayerForm);
