import { connect } from 'react-redux/es';

import IconButton from '../components/dice/IconButton';

const mapStateToProps = state => ({
  disableTriggerFocus: state.app.disableDiceButtonTooltipTriggerFocus,
});

// exclude dispatch from props
const mergeProps = (stateProps, dispatchProps, ownProps) => ({ ...ownProps, ...stateProps });

export default connect(mapStateToProps, undefined, mergeProps)(IconButton);
