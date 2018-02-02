import React, { PureComponent } from 'react';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import RadioGroup from 'redux-form-material-ui/es/RadioGroup';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Radio from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import { FEMALE, MALE } from 'munchkin-core/es/utils/gender';
import { noop } from 'lodash';

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

  render() {
    const { handleSubmit, intl, newPlayer, onImport } = this.props;

    return (
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Field component="input" name="avatar" type="hidden" />

        <Field
          autoFocus={newPlayer}
          component={this.constructor.renderTextField}
          fullWidth
          margin="normal"
          name="name"
          placeholder={intl.formatMessage(messages.label)}
        />

        {newPlayer && navigator.contacts ? (
          <IconButton
            disableTouchRipple
            onClick={onImport}
            style={{
              height: 24,
              padding: 0,
              position: 'absolute',
              right: 0,
              top: 12,
              width: 24,
            }}
          >
            <SocialPersonAdd />
          </IconButton>
        ) : null}

        <Grid container>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage
                  id="player.form.gender"
                  defaultMessage="Gender"
                />
              </FormLabel>
              <Field component={RadioGroup} name="gender">
                <FormControlLabel
                  control={<Radio />}
                  label={<GenderMale />}
                  value={MALE}
                />
                <FormControlLabel
                  control={<Radio />}
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
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  newPlayer: PropTypes.bool,
  onImport: PropTypes.func,
};

PlayerForm.defaultProps = {
  newPlayer: true,
  onImport: noop,
};

export default compose(
  reduxForm({
    form,
  }),
  injectIntl,
)(PlayerForm);
