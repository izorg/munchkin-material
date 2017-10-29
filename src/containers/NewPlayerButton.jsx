import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import { setActivePlayer, toggleEditMode } from '../actions';

import Fab from '../components/fab/Container';
import Add from '../components/fab/Add';
import Transition from '../components/fab/Transition';

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

const NewPlayerButton = ({ visible, ...props }) => (
  <Route exact path="/">
    {({ match }) => (
      <Transition in={!!match && visible}>
        <Fab>
          <Add {...props} />
        </Fab>
      </Transition>
    )}
  </Route>
);

NewPlayerButton.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(NewPlayerButton);
