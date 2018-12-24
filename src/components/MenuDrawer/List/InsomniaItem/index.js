import { connect } from 'react-redux';
import { branch, compose, fromRenderProps, renderNothing } from 'recompose';
import { pick } from 'lodash/fp';

import { setKeepAwake } from '../../../../ducks/app';

import { OptionsConsumer } from '../../../OptionsContext';

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
