import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import { setActivePlayer, toggleEditMode } from '../actions';

import Add from '../components/Fab/Add';
import Transition from '../components/Fab/Transition';

const mapStateToProps = state => ({
  visible: !state.app.editMode && !state.app.multiMode,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(toggleEditMode(false));
    dispatch(setActivePlayer());
    dispatch(push('/new'));
  },
});

const NewPlayerButton = ({ onClick, visible }) => (
  <Route exact path="/">
    {({ match }) => (
      <Transition in={Boolean(match && visible)}>
        <Add onClick={onClick} />
      </Transition>
    )}
  </Route>
);

NewPlayerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(NewPlayerButton);
