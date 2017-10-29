import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { FormControlLabel } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { duration } from 'material-ui/styles/transitions';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import { GENDER } from 'munchkin-core';

import Layout, { LayoutContent, LayoutHeader } from '../../Layout';
import { noop, PLAYER_FORM } from '../../../constants';
import ColorPickerField from '../../../containers/ColorPickerField';
import GenderFemale from '../../icons/gender/Female';
import GenderMale from '../../icons/gender/Male';
import { classesObject } from '../../../utils/propTypes';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = {
  content: {
    padding: 16,
  },

  fieldContainer: {
    marginBottom: 16,
    position: 'relative',

    '&:last-child': {
      marginBottom: 0,
    },
  },
};

class PlayerForm extends Component {
  static renderGenderField({ input }) {
    return (
      <RadioGroup
        name={input.name}
        onChange={(e, value) => input.onChange(value)}
        value={input.value}
      >
        <FormControlLabel control={<Radio />} label={<GenderMale />} value={GENDER.MALE} />
        <FormControlLabel control={<Radio />} label={<GenderFemale />} value={GENDER.FEMALE} />
      </RadioGroup>
    );
  }

  componentWillMount() {
    this.renderNameField = this.renderNameField.bind(this);
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.autoFocusTimeoutid = setTimeout(() => {
        delete this.autoFocusTimeoutid;

        const node = document.querySelector('input[name="name"]');

        if (node) {
          node.focus();
        }
      }, duration.enteringScreen);
    }
  }

  componentWillUnmount() {
    if (this.autoFocusTimeoutid) {
      clearTimeout(this.autoFocusTimeoutid);
    }
  }

  renderNameField({ input }) {
    const { intl } = this.props;

    return (
      <TextField
        {...input}
        fullWidth
        placeholder={intl.formatMessage(messages.label)}
      />
    );
  }

  render() {
    const {
      className, classes, handleSubmit, newPlayer, onCancel, onImport, title,
    } = this.props;

    return (
      <Layout className={className}>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar disableGutters>
              <IconButton color="contrast" onClick={onCancel}>
                <NavigationArrowBack />
              </IconButton>

              <Typography
                color="inherit"
                noWrap
                style={{ flex: 1 }}
                type="title"
              >
                {title}
              </Typography>

              <IconButton color="contrast" onClick={handleSubmit}>
                <NavigationCheck />
              </IconButton>
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent>
          <form
            autoComplete="off"
            className={classes.content}
            noValidate
            onSubmit={handleSubmit}
          >
            <Field component="input" name="avatar" type="hidden" />

            <div className={classes.fieldContainer}>
              <Field component={this.renderNameField} name="name" />
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
            </div>

            <div className={classes.fieldContainer}>
              <Field component={this.constructor.renderGenderField} name="gender" />
            </div>

            <ColorPickerField name="color" />
          </form>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerForm.propTypes = {
  autoFocus: PropTypes.bool,
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
  autoFocus: false,
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
