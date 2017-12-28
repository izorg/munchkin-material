import React from 'react';
import { FormattedMessage } from 'react-intl';
import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import formActions from 'redux-form/es/actions';
import { goBack } from 'connected-react-router/lib/actions';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';

import { noop, PLAYER_FORM } from '../../../../constants';
import { classesObject } from '../../../../utils/propTypes';

import Title from '../../../../components/Title';

const mapStateToProps = state => ({
  title: state.app.activePlayerId ?
    <FormattedMessage id="player.form.titleEdit" defaultMessage="Edit munchkin" /> :
    <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />,
});

const mapDispatchToProps = {
  onCancel: goBack,
  onSubmit: () => formActions.submit(PLAYER_FORM),
};

const styles = {
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

const PlayerFormScreenAppBar = ({
  classes, onCancel, onSubmit, title,
}) => (
  <AppBar color="primary" position="static">
    <Toolbar>
      <IconButton className={classes.leftButton} color="contrast" onClick={onCancel}>
        <NavigationArrowBack />
      </IconButton>

      <Title>
        {title}
      </Title>

      <IconButton className={classes.rightButton} color="contrast" onClick={onSubmit}>
        <NavigationCheck />
      </IconButton>
    </Toolbar>
  </AppBar>
);

PlayerFormScreenAppBar.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.node,
};

PlayerFormScreenAppBar.defaultProps = {
  onCancel: noop,
  onSubmit: noop,
  title: '',
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(PlayerFormScreenAppBar);
