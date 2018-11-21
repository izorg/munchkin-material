import React, { memo } from 'react';
import { hot } from 'react-hot-loader';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

import FadeUp from '../../components/FadeUp';
import ModalScreen from '../../components/ModalScreen';

import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import Page from './Page';
import { ios } from '../../utils/platforms';

const Transition = ios
  ? (props) => <Slide direction="left" {...props} />
  : FadeUp;

const styles = {
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    outline: 'none',
  },
};

const CombatScreen = ({ appear, classes, fabAppear, match, theme }) => {
  const inProp = Boolean(match);

  return (
    <ModalScreen>
      <div className={classes.content}>
        <Transition appear={fabAppear} in={inProp} mountOnEnter unmountOnExit>
          <Page />
        </Transition>

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
