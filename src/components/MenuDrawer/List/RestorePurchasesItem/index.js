import { connect } from 'react-redux';
import {
  branch,
  compose,
  fromRenderProps,
  mapProps,
  renderNothing,
} from 'recompose';
import { omit, pick } from 'lodash/fp';

import { OptionsConsumer } from '../../../OptionsContext';

import Component from './Component';

const mapStateToProps = (state) => ({
  fullVersion: state.app.fullVersion,
});

const mapDispatchToProps = {};

export default compose(
  fromRenderProps(OptionsConsumer, pick('restorePurchases')),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  branch(
    ({ fullVersion, restorePurchases }) => fullVersion || !restorePurchases,
    renderNothing,
  ),
  mapProps(omit('fullVersion')),
)(Component);
