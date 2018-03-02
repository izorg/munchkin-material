import React, { PureComponent } from 'react';
import compose from 'recompose/compose';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';

import GenderFemale from '../../../components/icons/gender/Female';
import GenderMale from '../../../components/icons/gender/Male';
import Layout, { LayoutContent } from '../../../components/Layout';

import AppBar from './AppBar';
import ColorPicker from './Form/ColorPicker';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = (theme) => ({
  content: {
    ...theme.mixins.gutters({}),
    overflowY: 'auto',
  },
});

class PlayerFormScreenComponent extends PureComponent {
  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  static renderRadioGroup({ input, ...props }) {
    return <RadioGroup {...input} {...props} />;
  }

  render() {
    const { classes, handleSubmit, intl, newPlayer } = this.props;

    return (
      <Layout
        autoComplete="off"
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <AppBar />
        <LayoutContent className={classes.content}>
          <Field
            autoFocus={newPlayer}
            component={PlayerFormScreenComponent.renderTextField}
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
                <Field
                  component={PlayerFormScreenComponent.renderRadioGroup}
                  name="gender"
                >
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
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerFormScreenComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  newPlayer: PropTypes.bool,
};

PlayerFormScreenComponent.defaultProps = {
  newPlayer: true,
};

export default compose(
  reduxForm({ form: 'player' }),
  injectIntl,
  withStyles(styles),
)(PlayerFormScreenComponent);
