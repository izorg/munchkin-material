import { connect } from 'react-redux';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
import renderNothing from 'recompose/renderNothing';
import { pick } from 'lodash/fp';

import { setKeepAwake } from '../../../ducks/app';

import { OptionsConsumer } from '../../OptionsContext';

import Component from './Component';

const mapStateToProps = (state) => ({
  keepAwake: state.app.keepAwake,
});

const mapDispatchToProps = {
  onChange: setKeepAwake,
};

export default compose(
  fromRenderProps(OptionsConsumer, pick('keepAwakeSupport')),
  branch(({ keepAwakeSupport }) => !keepAwakeSupport, renderNothing),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Component);
