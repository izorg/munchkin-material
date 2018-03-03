import React, { Fragment, PureComponent } from 'react';
import Hammer from 'react-hammerjs';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Layout from '../../../../components/Layout';
import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import MenuDrawer from './MenuDrawer';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import ThemeDialog from './ThemeDialog';

class HomeScreenPageComponent extends PureComponent {
  render() {
    const { empty, onMenuOpen, singleMode } = this.props;

    let content;

    if (singleMode) {
      content = <SinglePlayer />;
    } else if (empty) {
      content = <Nobody />;
    } else {
      content = <PlayerList />;
    }

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
          {content}
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
  singleMode: PropTypes.bool,
};

HomeScreenPageComponent.defaultProps = {
  empty: false,
  onMenuOpen: noop,
  singleMode: false,
};

export default HomeScreenPageComponent;
