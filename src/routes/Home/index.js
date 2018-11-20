import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import Component from './Component';

const mode = (state, ownProps) => get(['match', 'params', 'mode'], ownProps);

const mapStateToProps = createStructuredSelector({
  singleMode: get(['app', 'singleMode']),
  mode,
});

export default connect(mapStateToProps)(Component);
