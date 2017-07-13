import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import injectSheet from 'react-jss';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import { GENDER } from 'munchkin';

import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import AppBar from '../../material-ui/AppBar';
import { noop } from '../../../constants';
import GenderFemale from '../../icons/gender/Female';
import GenderMale from '../../icons/gender/Male';
import { classesShape } from '../../../helpers/PropTypes';

const styles = {
  content: {
    padding: '16px',
  },

  fieldContainer: {
    marginBottom: '16px',

    '&:last-child': {
      marginBottom: 0,
    },
  },
};

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
    const { classes, handleSubmit, onCancel, title } = this.props;

    const backButton = (
      <IconButton onTouchTap={onCancel}>
        <NavigationArrowBack />
      </IconButton>
    );

    const submitButton = (
      <IconButton onTouchTap={handleSubmit}>
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
            className={classes.content}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={classes.fieldContainer}>
              <Field component={this.constructor.renderNameField} name="name" />
            </div>
            <div className={classes.fieldContainer}>
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
  classes: classesShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.node,
};

PlayerForm.defaultProps = {
  autoFocus: false,
  onCancel: noop,
  title: null,
};

export default reduxForm({ form: 'player' })(injectSheet(styles)(PlayerForm));
