import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { stringifyQuery } from '../../../../../../utils/location';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  epic: get(['app', 'epic']),
  levelLimit: get(['app', 'levelLimit']),
});

const mapDispatchToProps = {
  onClick: () => replace({ search: stringifyQuery({ levelLimit: null }) }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
