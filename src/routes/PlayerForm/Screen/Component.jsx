import React, { PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import compose from 'recompose/compose';
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
import { noop } from 'lodash';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/gender';

import GenderFemale from '../../../components/icons/gender/Female';
import GenderMale from '../../../components/icons/gender/Male';
import Layout, { LayoutContent } from '../../../components/Layout';
import { genderProp } from '../../../utils/propTypes';

import AppBar from './AppBar';
import ColorPicker from './ColorPicker';

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

  icon: {
    fontSize: theme.typography.pxToRem(24),
  },
});

class PlayerFormScreenComponent extends PureComponent {
  static renderColorPicker({ input, ...props }) {
    return <ColorPicker {...input} {...props} />;
  }

  static renderRadioGroup({ input, ...props }) {
    return <RadioGroup {...input} {...props} />;
  }

  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  render() {
    const { classes, initialValues, intl, newPlayer, onSubmit } = this.props;

    return (
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        subscription={{ submitting: true }}
        render={({ handleSubmit }) => (
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
                        label={<GenderMale className={classes.icon} />}
                        value={MALE}
                      />
                      <FormControlLabel
                        control={<Radio color="primary" />}
                        label={<GenderFemale className={classes.icon} />}
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
                    <Field
                      component={PlayerFormScreenComponent.renderColorPicker}
                      name="color"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </LayoutContent>
          </Layout>
        )}
      />
    );
  }
}

PlayerFormScreenComponent.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    gender: genderProp.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  newPlayer: PropTypes.bool,
  onSubmit: PropTypes.func,
};

PlayerFormScreenComponent.defaultProps = {
  newPlayer: true,
  onSubmit: noop,
};

export default compose(injectIntl, withStyles(styles))(
  PlayerFormScreenComponent,
);
