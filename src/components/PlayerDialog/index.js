import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flow, get } from 'lodash/fp';

import { getQuery } from '../../utils/location';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  playerId: flow(
    getQuery,
    get('player'),
  ),
});

const mapDispatchToProps = {
  onClose: goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
