import React, { PureComponent } from 'react';
import Field from 'redux-form/es/Field';
import reduxForm from 'redux-form/es/reduxForm';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import RadioGroup from 'redux-form-material-ui/es/RadioGroup';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/es/AppBar';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/es/Form';
import Grid from 'material-ui/es/Grid';
import IconButton from 'material-ui/es/IconButton';
import Radio from 'material-ui/es/Radio';
import TextField from 'material-ui/es/TextField';
import Toolbar from 'material-ui/es/Toolbar';
import { withStyles } from 'material-ui/es/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import { FEMALE, MALE } from 'munchkin-core/es/constants/gender';

import Layout, { LayoutContent, LayoutHeader } from '../Layout';
import Title from '../Title';
import { noop, PLAYER_FORM } from '../../constants';
import PlayerColorPickerField from '../../containers/PlayerForm/PlayerColorPickerField';
import GenderFemale from '../icons/gender/Female';
import GenderMale from '../icons/gender/Male';
import { classesObject } from '../../utils/propTypes';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

class PlayerForm extends PureComponent {
  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  render() {
    const {
      className, classes, handleSubmit, intl, newPlayer, onCancel, onImport, title,
    } = this.props;

    return (
      <Layout className={className}>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar>
              <IconButton className={classes.leftButton} color="contrast" onClick={onCancel}>
                <NavigationArrowBack />
              </IconButton>

              <Title>
                {title}
              </Title>

              <IconButton className={classes.rightButton} color="contrast" onClick={handleSubmit}>
                <NavigationCheck />
              </IconButton>
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent>
          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <Field component="input" name="avatar" type="hidden" />

            <Field
              autoFocus={newPlayer}
              component={this.constructor.renderTextField}
              fullWidth
              margin="normal"
              name="name"
              placeholder={intl.formatMessage(messages.label)}
            />

            {
              newPlayer && navigator.contacts ? (
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
              ) : null
            }

            <Grid container>
              <Grid item xs={6} sm={3} md={2} lg={1}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">
                    <FormattedMessage id="player.form.gender" defaultMessage="Gender" />
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
                    <FormattedMessage id="player.form.color" defaultMessage="Color" />
                  </FormLabel>
                  <Field component={PlayerColorPickerField} name="color" />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerForm.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  newPlayer: PropTypes.bool,
  onCancel: PropTypes.func,
  onImport: PropTypes.func,
  title: PropTypes.node,
};

PlayerForm.defaultProps = {
  className: '',
  newPlayer: true,
  onImport: noop,
  onCancel: noop,
  title: null,
};

export default reduxForm({
  form: PLAYER_FORM,
  pure: false,
})(injectIntl(withStyles(styles)(PlayerForm)));
