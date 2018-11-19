import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';

import { finishCombat } from '../../../../ducks/app';

import Component from './Component';

const mapDispatchToProps = {
  onBack: goBack,
  onFinish: () => (dispatch) => {
    dispatch(finishCombat());
    dispatch(goBack());
  },
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
