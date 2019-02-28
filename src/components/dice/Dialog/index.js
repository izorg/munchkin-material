import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';

import { throwDice } from '../../../ducks/dice';
import { getQuery } from '../../../utils/location';

import Component from './Component';

const mapStateToProps = (state) => ({
  dice: state.dice,
  open: getQuery(state).dice !== undefined,
});

const mapDispatchToProps = {
  onDiceClick: throwDice,
  onClose: goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
