import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import fromRenderProps from 'recompose/fromRenderProps';
import renderNothing from 'recompose/renderNothing';
import { pick } from 'lodash/fp';

import { OptionsConsumer } from '../../../../../../components/OptionsContext';

import Component from './Component';

const mapDispatchToProps = {
  onClick: goBack,
};

export default compose(
  fromRenderProps(OptionsConsumer, pick('rateLink')),
  branch(({ rateLink }) => !rateLink, renderNothing),
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Component);
