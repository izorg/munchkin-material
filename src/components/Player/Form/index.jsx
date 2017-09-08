import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { FormControlLabel } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/Input/Input';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import { GENDER } from 'munchkin-core';

import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import { noop, PLAYER_FORM } from '../../../constants';
import GenderFemale from '../../icons/gender/Female';
import GenderMale from '../../icons/gender/Male';

import cn from './style.css';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

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
      }, 400);
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
    const { handleSubmit, newPlayer, onCancel, onImport, title } = this.props;

    const backButton = (
      <IconButton color="contrast" onClick={onCancel}>
        <NavigationArrowBack />
      </IconButton>
    );

    const submitButton = (
      <IconButton color="contrast" onClick={handleSubmit}>
        <NavigationCheck />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar disableGutters>
              {backButton}
              <Typography
                color="inherit"
                noWrap
                style={{ flex: 1 }}
                type="title"
              >
                {title}
              </Typography>
              {submitButton}
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent>
          <form
            autoComplete="off"
            className={cn.content}
            noValidate
            onSubmit={handleSubmit}
          >
            <Field component="input" name="avatar" type="hidden" />

            <div className={cn.fieldContainer}>
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

            <div className={cn.fieldContainer}>
              <Field component={this.constructor.renderGenderField} name="gender" />
            </div>
          </form>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerForm.propTypes = {
  autoFocus: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  newPlayer: PropTypes.bool,
  onImport: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.node,
};

PlayerForm.defaultProps = {
  autoFocus: false,
  newPlayer: true,
  onImport: noop,
  onCancel: noop,
  title: null,
};

export default injectIntl(reduxForm({ form: PLAYER_FORM })(PlayerForm));
