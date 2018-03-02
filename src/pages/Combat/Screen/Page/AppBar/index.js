import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';

import { finishCombat } from '../../../../../actions';

import Component from './Component';

const mapDispatchToProps = {
  onBack: goBack,
  onFinish: () => (dispatch) => {
    dispatch(finishCombat());
    dispatch(goBack());
  },
};

export default connect(undefined, mapDispatchToProps)(Component);
