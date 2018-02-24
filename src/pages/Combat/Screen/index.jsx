import React, { Fragment, PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Transition from '../../../components/fab/Transition';

import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import Page from './Page';

class CombatScreen extends PureComponent {
  render() {
    const { appear, match } = this.props;

    return (
      <Fragment>
        <Slide
          appear={appear}
          direction="left"
          in={Boolean(match)}
          mountOnEnter
          unmountOnExit
        >
          <Page />
        </Slide>
        <Transition appear={appear} in={Boolean(match)}>
          <HelperButton />
        </Transition>
        <HelperSelector />
      </Fragment>
    );
  }
}

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

CombatScreen.defaultProps = {
  match: null,
};

export default hot(module)(CombatScreen);
