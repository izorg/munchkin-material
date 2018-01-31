import connect from 'react-redux/es/connect/connect';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import formActions from 'redux-form/lib/actions';
import { createSelector } from 'reselect/es';
import PropTypes from 'prop-types';
import { MALE } from 'munchkin-core/es/utils/gender';

import { submitPlayer } from '../../../../actions';
import getRandomMaterialColor from '../../../../utils/getRandomMaterialColor';

import Component, { form } from './Component';

const contextTypes = {
  playerId: PropTypes.string,
};

const initialValuesSelector = createSelector(
  state => state.players,
  (state, ownProps) => ownProps.playerId,
  (players, playerId) => {
    let initialValues = {
      gender: MALE,
    };

    if (playerId) {
      const selectedPlayer = players[playerId];

      if (selectedPlayer) {
        initialValues = {
          ...initialValues,
          ...selectedPlayer,
        };
      }
    } else {
      initialValues = {
        ...initialValues,
        color: getRandomMaterialColor(),
      };
    }

    return initialValues;
  },
);

const mapStateToProps = (state, ownProps) => ({
  autoFocus: !ownProps.playerId,
  initialValues: initialValuesSelector(state, ownProps),
  newPlayer: !ownProps.playerId,
});

const onImport = () => (dispatch) => {
  navigator.contacts.pickContact(({ displayName, photos }) => {
    dispatch(formActions.change(form, 'name', displayName));

    if (photos) {
      dispatch(formActions.change(form, 'avatar', photos[0].value));
    }
  });
};

const mapDispatchToProps = {
  onImport,
  onSubmit: submitPlayer,
};

export default compose(
  getContext(contextTypes),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
