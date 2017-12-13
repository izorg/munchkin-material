import React from 'react';
import connect from 'react-redux/es/connect/connect';
import withRouter from 'react-router-dom/es/withRouter';
import { push } from 'connected-react-router/lib/actions';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { setActivePlayer, toggleEditMode } from '../../../../actions/index';

import Fab from '../../../../components/fab/Container';
import Add from '../../../../components/fab/Add';
import Transition from '../../../../components/fab/Transition';

const mapStateToProps = (state, ownProps) => ({
  in: ownProps.match.isExact && !ownProps.match.params.mode,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(toggleEditMode(false));
    dispatch(setActivePlayer());
    dispatch(push('/new'));
  },
});

const NewPlayerButton = ({ in: inProp, onClick }) => (
  <Transition in={inProp}>
    <Fab>
      <Add onClick={onClick} />
    </Fab>
  </Transition>
);

NewPlayerButton.propTypes = {
  in: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(NewPlayerButton);
