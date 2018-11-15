import React, { memo } from 'react';
import { hot } from 'react-hot-loader';
import Transition from 'react-transition-group/Transition';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FadeUp from '../../components/FadeUp';
import ModalScreen from '../../components/ModalScreen';

import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import Page from './Page';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.modal - 1,
  },

  transition: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    outline: 'none',
  },
});

const CombatScreen = ({ appear, classes, fabAppear, match, theme }) => {
  const inProp = Boolean(match);

  return (
    <ModalScreen className={classes.root} open={inProp}>
      <Transition
        appear={appear}
        in={inProp}
        mountOnEnter
        timeout={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen,
        }}
        unmountOnExit
      >
        <div className={classes.transition}>
          <FadeUp appear={fabAppear} in={inProp} mountOnEnter unmountOnExit>
            <Page />
          </FadeUp>

          <HelperButton
            TransitionProps={{
              appear,
              in: inProp,
              style: {
                transitionDelay: inProp
                  ? theme.transitions.duration.leavingScreen
                  : 0,
              },
            }}
          />

          <HelperSelector />
        </div>
      </Transition>
    </ModalScreen>
  );
};

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  fabAppear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

CombatScreen.defaultProps = {
  match: null,
};

export default compose(
  hot(module),
  withStyles(styles),
  memo,
)(CombatScreen);
