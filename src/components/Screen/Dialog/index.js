import { compose, defaultProps, mapProps, setDisplayName } from 'recompose';
import { Dialog, Slide, withStyles } from '@material-ui/core';
import cns from 'classnames';

import { ios } from '../../../utils/platforms';

import Transition from '../Transition';

const TransitionComponent = ios
  ? defaultProps({ direction: 'left' })(Slide)
  : Transition;

const styles = {
  root: {
    zIndex: 'auto',
  },
};

export default compose(
  withStyles(styles),
  setDisplayName('ScreenDialog'),
  mapProps(({ classes, className, ...rest }) => ({
    ...rest,
    className: cns(className, classes.root),
  })),
  defaultProps({
    disableEscapeKeyDown: true,
    disablePortal: true,
    fullScreen: true,
    hideBackdrop: true,
    TransitionComponent,
  }),
)(Dialog);
