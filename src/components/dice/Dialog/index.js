import { goBack } from 'connected-react-router/lib/actions';
import { connect } from 'react-redux';

import { throwDice } from '../../../ducks/app';

import Component from './Component';

const mapStateToProps = (state) => ({
  dice: state.app.dice,
  open: state.router.location.search === '?dice',
});

const mapDispatchToProps = {
  onDiceClick: throwDice,
  onClose: goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
