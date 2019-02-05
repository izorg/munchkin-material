import { goBack, push, replace } from 'connected-react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { addMonster, createMonster } from 'munchkin-core';
import { flow, get, isNull } from 'lodash/fp';

import { getQuery } from '../../../utils/location';

import Component from './Component';

const helper = createSelector(
  get(['combat', 'helperId']),
  get('playerList'),
  (helperId, playerList) => !helperId && playerList.length > 1,
);

const mapStateToProps = createStructuredSelector({
  helper,
  open: flow(
    getQuery,
    get('add'),
    isNull,
  ),
});

const mapDispatchToProps = {
  onAdd: () => push(`?add`),
  onBack: goBack,
  onHelperClick: () => replace(`?add=helper`),
  onMonsterAdd: () => addMonster(createMonster()),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
