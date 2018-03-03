import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { matchSelector } from './selectors';

import Screen from './Screen';

const mapStateToProps = createStructuredSelector({
  match: matchSelector,
});

export default connect(mapStateToProps)(Screen);
