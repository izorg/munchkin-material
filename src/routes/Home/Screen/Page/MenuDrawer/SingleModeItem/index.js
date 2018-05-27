import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';
import { noop } from 'lodash';

import { setSingleMode } from '../../../../../../ducks/app';

import Component from './Component';

const mapStateToProps = (state) => ({
  singleMode: state.app.singleMode,
});

const mapDispatchToProps = {
  onChange: (singleMode) => (dispatch) => {
    if (singleMode) {
      dispatch(setSingleMode(singleMode))
        .then(() => dispatch(goBack()))
        .catch(noop);
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
