import { connect } from 'react-redux';
import { noop } from 'lodash';

import { setKeepAwake } from '../../../../../../actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  keepAwake: state.app.keepAwake,
  supported: window.plugins && window.plugins.insomnia,
});

const mapDispatchToProps = {
  onChange: (keepAwake) => (dispatch) => {
    dispatch(setKeepAwake(keepAwake));

    if (keepAwake) {
      window.plugins.insomnia
        .keepAwake()
        .then(noop, () => dispatch(setKeepAwake(!keepAwake)));
    } else {
      window.plugins.insomnia
        .allowSleepAgain()
        .then(noop, () => dispatch(setKeepAwake(!keepAwake)));
    }
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
