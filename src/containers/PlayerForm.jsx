import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { GENDER } from 'munchkin-core';

import { importContact, submitPlayer } from '../actions';
import FadeInUpOutDown from '../components/transitions/Screen/Fade';
import Form from '../components/Player/Form';
import getRandomMaterialColor from '../helpers/getRandomMaterialColor';

const getInitialValues = ({ app: { activePlayerId }, playerColors, players }) => {
  let initialValues = {
    gender: GENDER.MALE,
  };

  if (activePlayerId) {
    const selectedPlayer = players[activePlayerId];

    if (selectedPlayer) {
      initialValues = {
        ...initialValues,
        ...selectedPlayer,
        color: playerColors[activePlayerId],
      };
    }
  } else {
    initialValues = {
      ...initialValues,
      color: getRandomMaterialColor(),
    };
  }

  return initialValues;
};

const mapStateToProps = state => ({
  autoFocus: !state.app.activePlayerId,
  initialValues: getInitialValues(state),
  newPlayer: !state.app.activePlayerId,
  path: state.app.activePlayerId ? '/edit/:id' : '/new',
  title: state.app.activePlayerId ?
    <FormattedMessage id="player.form.titleEdit" defaultMessage="Edit munchkin" /> :
    <FormattedMessage id="player.form.title" defaultMessage="New munchkin" />,
});

const mapDispatchToProps = {
  onCancel: goBack,
  onImport: importContact,
  onSubmit: submitPlayer,
};

const PlayerForm = ({ path, ...props }) => (
  <Route path={path}>
    {({ match }) => (
      <FadeInUpOutDown in={Boolean(match)}>
        <Form {...props} />
      </FadeInUpOutDown>
    )}
  </Route>
);

PlayerForm.propTypes = {
  path: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);
