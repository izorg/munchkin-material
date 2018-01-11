import connect from 'react-redux/es/connect/connect';
import formActions from 'redux-form/es/actions';
import { MALE } from 'munchkin-core/es/utils/gender';

import { submitPlayer } from '../../../../actions';
import getRandomMaterialColor from '../../../../utils/getRandomMaterialColor';

import Component, { form } from './Component';

const getInitialValues = ({ app: { activePlayerId }, playerColors, players }) => {
  let initialValues = {
    gender: MALE,
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

export default connect(mapStateToProps, mapDispatchToProps)(Component);
