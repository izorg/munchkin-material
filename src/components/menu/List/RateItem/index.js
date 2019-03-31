import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { branch, compose, fromRenderProps, renderNothing } from 'recompose';
import { pick } from 'lodash/fp';

import OptionsContext from '../../../OptionsContext';

import Component from './Component';

const mapDispatchToProps = {
  onClick: goBack,
};

export default compose(
  fromRenderProps(OptionsContext.Consumer, pick('rateLink')),
  branch(({ rateLink }) => !rateLink, renderNothing),
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Component);
