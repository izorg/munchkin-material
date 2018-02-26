import React, { Fragment, PureComponent } from 'react';
import Hammer from 'react-hammerjs';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Layout from '../../../../components/Layout';
import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import MenuDrawer from './MenuDrawer';
import PlayerList from './PlayerList';
import ThemeDialog from './ThemeDialog';

class HomeScreenPageComponent extends PureComponent {
  render() {
    const { empty, onMenuOpen } = this.props;

    return (
      <Fragment>
        <Layout
          component={(props) => (
            <Hammer onSwipeRight={onMenuOpen}>
              <div {...props} />
            </Hammer>
          )}
        >
          <AppBar />
          {empty ? <Nobody /> : <PlayerList />}
        </Layout>
        <MenuDrawer />
        <ThemeDialog />
      </Fragment>
    );
  }
}

HomeScreenPageComponent.propTypes = {
  empty: PropTypes.bool,
  onMenuOpen: PropTypes.func,
};

HomeScreenPageComponent.defaultProps = {
  empty: false,
  onMenuOpen: noop,
};

export default HomeScreenPageComponent;
