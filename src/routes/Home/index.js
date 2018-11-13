import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state, ownProps) => {
  const {
    app: { singleMode },
  } = state;
  const { match } = ownProps;

  return {
    in: Boolean(match) && match.isExact && !match.params.mode && !singleMode,
  };
};

export default connect(mapStateToProps)(Component);
