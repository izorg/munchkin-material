import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { setActivePlayer, toggleEditMode } from '../actions';
import MainButton from '../components/MainButton';

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(toggleEditMode(false));
    dispatch(setActivePlayer());
    dispatch(push('/player'));
  },
});

export default connect(undefined, mapDispatchToProps)(MainButton);
