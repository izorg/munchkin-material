import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import actions from '../actions';
import MainButton from '../components/MainButton';

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(actions.toggleEditMode(false));
    dispatch(actions.setActivePlayer());
    dispatch(push('/player'));
  },
});

export default connect(undefined, mapDispatchToProps)(MainButton);
