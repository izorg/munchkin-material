import connect from 'react-redux/es/connect/connect';
import { push } from 'connected-react-router/lib/actions';

import { throwDice } from '../actions';

import IconButton from '../components/dice/IconButton';

const mapStateToProps = state => ({
  disableTriggerFocus: state.app.disableDiceButtonTooltipTriggerFocus,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(throwDice());
    dispatch(push({ search: '?dice' }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IconButton);
