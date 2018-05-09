import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import compose from 'recompose/compose';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Radio from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/es/transitions/Slide';
import { noop } from 'lodash';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/sex';

import SexFemale from '../../../../components/icons/sex/Female';
import SexMale from '../../../../components/icons/sex/Male';
import Layout, { LayoutContent } from '../../../../components/Layout';
import { sexProp } from '../../../../utils/propTypes';

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

class PlayerFormScreenComponent extends Component {
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
      appear: props.appear,
    };

    this.handleExited = this.handleExited.bind(this);
    this.renderTransition = this.renderTransition.bind(this);
  }

  handleExited() {
    if (!this.state.appear) {
      this.setState({
        appear: true,
      });
    }
  }

  renderTransition(props) {
    const { appear } = this.state;

    return <Slide {...props} appear={appear} direction="up" />;
  }

  render() {
    const {
      classes,
      initialValues,
      intl,
      newPlayer,
      onSubmit,
      open,
    } = this.props;

    return (
      <Dialog
        fullScreen
        hideBackdrop
        onExited={this.handleExited}
        open={open}
        TransitionComponent={this.renderTransition}
      >
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
                          id="player.form.sex"
                          defaultMessage="Sex"
                        />
                      </FormLabel>
                      <FormControlLabel
                        control={
                          <Field
                            component={PlayerFormScreenComponent.renderRadio}
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
                            component={PlayerFormScreenComponent.renderRadio}
                            name="sex"
                            type="radio"
                          />
                        }
                        label={<SexFemale className={classes.icon} />}
                        value={FEMALE}
                      />
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
      </Dialog>
    );
  }
}

PlayerFormScreenComponent.propTypes = {
  appear: PropTypes.bool,
  initialValues: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string,
    sex: sexProp.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  newPlayer: PropTypes.bool,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

PlayerFormScreenComponent.defaultProps = {
  appear: false,
  newPlayer: true,
  onSubmit: noop,
  open: false,
};

export default compose(injectIntl, withStyles(styles))(
  PlayerFormScreenComponent,
);
