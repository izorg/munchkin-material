import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';

import { setSingleMode } from '../../../../../../ducks/app';

import Component from './Component';

const mapStateToProps = (state) => ({
  singleMode: state.app.singleMode,
});

const mapDispatchToProps = {
  onChange: (singleMode) => async (dispatch) => {
    if (singleMode) {
      try {
        await dispatch(setSingleMode(singleMode));
        dispatch(goBack());
      } catch (error) {}
    } else {
      dispatch(setSingleMode(singleMode));
      dispatch(goBack());
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
