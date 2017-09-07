import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import { GENDER } from 'munchkin-core';

import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import AppBar from '../../material-ui/AppBar';
import { noop, PLAYER_FORM } from '../../../constants';
import { ios } from '../../../helpers/platforms';
import GenderFemale from '../../icons/gender/Female';
import GenderMale from '../../icons/gender/Male';

import cn from './style.css';

class PlayerForm extends Component {
  static renderNameField({ input }) {
    return (
      <TextField
        {...input}
        fullWidth
        hintText={<FormattedMessage id="player.form.namePlaceholder" defaultMessage="Name" />}
      />
    );
  }

  static renderGenderField({ input }) {
    return (
      <RadioButtonGroup
        defaultSelected={input.value}
        name={input.name}
        onChange={(e, value) => input.onChange(value)}
      >
        <RadioButton
          label={<GenderMale />}
          value={GENDER.MALE}
        />
        <RadioButton
          label={<GenderFemale />}
          value={GENDER.FEMALE}
        />
      </RadioButtonGroup>
    );
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

  render() {
    const { handleSubmit, newPlayer, onCancel, onImport, title } = this.props;

    const backButton = (
      <IconButton onClick={onCancel}>
        <NavigationArrowBack />
      </IconButton>
    );

    const submitButton = (
      <IconButton onClick={handleSubmit} style={{ marginLeft: ios ? 8 : undefined }}>
        <NavigationCheck />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={backButton}
            iconElementRight={submitButton}
            title={title}
          />
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
              <Field component={this.constructor.renderNameField} name="name" />
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

export default reduxForm({ form: PLAYER_FORM })(PlayerForm);
