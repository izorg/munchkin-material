import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import Component from './Component';

const mode = (state, ownProps) => get(['match', 'params', 'mode'], ownProps);

const mapStateToProps = createStructuredSelector({
  singleMode: get(['app', 'singleMode']),
  mode,
});

export default compose(
  hot(module),
  connect(mapStateToProps),
)(Component);
