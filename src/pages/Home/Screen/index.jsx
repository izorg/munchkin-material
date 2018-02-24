import React, { Fragment, PureComponent } from 'react';
import Helmet from 'react-helmet/lib/Helmet';
import PropTypes from 'prop-types';
import { withTheme } from 'material-ui/styles';

import Transition from '../../../components/fab/Transition';

import { MULTI } from '../modes';

import Page from './Page';
import PlayerAddButton from './PlayerAddButton';

class HomeScreen extends PureComponent {
  render() {
    const { match, theme } = this.props;

    return (
      <Fragment>
        {match.params.mode === MULTI && (
          <Helmet>
            <meta name="theme-color" content={theme.palette.grey[100]} />
          </Helmet>
        )}
        <Page />
        <Transition
          appear={false}
          in={Boolean(match) && match.isExact && !match.params.mode}
        >
          <PlayerAddButton />
        </Transition>
      </Fragment>
    );
  }
}

HomeScreen.propTypes = {
  match: PropTypes.object,
};

HomeScreen.defaultProps = {
  match: null,
};

export default withTheme()(HomeScreen);
