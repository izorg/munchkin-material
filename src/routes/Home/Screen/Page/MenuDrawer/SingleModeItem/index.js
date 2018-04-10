import { connect } from 'react-redux';
import { replace } from 'connected-react-router/lib/actions';
import { noop } from 'lodash';

import { setSingleMode } from '../../../../../../ducks/app';

import { SINGLE } from '../../../../modes';
import { modeSelector } from '../../../../selectors';

import Component from './Component';

const mapStateToProps = (state) => ({
  singleMode: modeSelector(state) === SINGLE,
});

const mapDispatchToProps = {
  onChange: (singleMode) => (dispatch) => {
    if (singleMode) {
      dispatch(setSingleMode()).then(
        () => dispatch(replace(`/${SINGLE}`)),
        noop,
      );
    } else {
      dispatch(replace('/'));
    }
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
