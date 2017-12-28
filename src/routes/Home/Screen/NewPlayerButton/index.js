import connect from 'react-redux/es/connect/connect';
import { push } from 'connected-react-router/lib/actions';

import { setActivePlayer, toggleEditMode } from '../../../../actions';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => (dispatch) => {
    dispatch(toggleEditMode(false));
    dispatch(setActivePlayer());
    dispatch(push('/new'));
  },
};

export default connect(undefined, mapDispatchToProps)(Component);
