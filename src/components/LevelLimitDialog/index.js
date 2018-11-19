import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get, isUndefined, negate } from 'lodash/fp';

import { setEpic, setLevelLimit } from '../../ducks/app';
import { getQuery } from '../../utils/location';

import Component, {
  DEFAULT_MUNCHKIN_LIMIT,
  EPIC_MUNCHKIN_LIMIT,
  NO_LIMIT,
} from './Component';

const mapStateToProps = createStructuredSelector({
  defaultValue: createSelector(
    get(['app', 'levelLimit']),
    get(['app', 'epic']),
    (levelLimit, epic) => {
      if (levelLimit) {
        if (epic) {
          return EPIC_MUNCHKIN_LIMIT;
        }
        return DEFAULT_MUNCHKIN_LIMIT;
      }

      return NO_LIMIT;
    },
  ),
  open: flow(
    getQuery,
    get('levelLimit'),
    negate(isUndefined),
  ),
});

const mapDispatchToProps = {
  onClose: goBack,
  onSubmit: (value) => (dispatch) => {
    switch (value) {
      case NO_LIMIT:
        dispatch(setLevelLimit(false));
        break;

      case DEFAULT_MUNCHKIN_LIMIT:
        dispatch(setEpic(false));
        dispatch(setLevelLimit(true));
        break;

      case EPIC_MUNCHKIN_LIMIT:
        dispatch(setEpic(true));
        dispatch(setLevelLimit(true));
        break;

      default:
        break;
    }

    dispatch(goBack());
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
