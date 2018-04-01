import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Layout from '../../../../components/Layout';
import Nobody from '../../../../components/Nobody';

import AppBar from './AppBar';
import MenuDrawer from './MenuDrawer';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import ThemeDialog from './ThemeDialog';

class HomeScreenPageComponent extends PureComponent {
  render() {
    const { empty, menu, singleMode } = this.props;

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
        <Layout>
          <AppBar />
          {content}
        </Layout>
        {menu && <MenuDrawer />}
        <ThemeDialog />
      </Fragment>
    );
  }
}

HomeScreenPageComponent.propTypes = {
  empty: PropTypes.bool,
  menu: PropTypes.bool,
  singleMode: PropTypes.bool,
};

HomeScreenPageComponent.defaultProps = {
  empty: false,
  menu: false,
  singleMode: false,
};

export default HomeScreenPageComponent;
