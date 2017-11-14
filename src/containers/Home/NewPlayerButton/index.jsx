import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import { setActivePlayer, toggleEditMode } from '../../../actions';

import Fab from '../../../components/fab/Container';
import Add from '../../../components/fab/Add';
import Transition from '../../../components/fab/Transition';

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(toggleEditMode(false));
    dispatch(setActivePlayer());
    dispatch(push('/new'));
  },
});

const NewPlayerButton = ({ in: inProp, ...props }) => (
  <Transition in={inProp}>
    <Fab>
      <Add {...props} />
    </Fab>
  </Transition>
);

NewPlayerButton.propTypes = {
  in: PropTypes.bool.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(NewPlayerButton);
