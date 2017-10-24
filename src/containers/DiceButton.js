import { connect } from 'react-redux';

import IconButton from '../components/dice/IconButton';

const mapStateToProps = state => ({
  disableTriggerFocus: state.app.disableDiceButtonTooltipTriggerFocus,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({ ...ownProps, ...stateProps });

export default connect(mapStateToProps, undefined, mergeProps)(IconButton);
