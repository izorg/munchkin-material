import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { setActivePlayer, toggleEditMode } from '../actions';

import NewPlayerButton from '../components/NewPlayerButton';

const mapDispatchToProps = dispatch => ({
  onTouchTap: () => {
    dispatch(toggleEditMode(false));
    dispatch(setActivePlayer());
    dispatch(push('/player'));
  },
});

export default connect(undefined, mapDispatchToProps)(NewPlayerButton);
