import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import PlayerListTitleMessage from '../../../../../../components/PlayerListTitleMessage';
import Title from '../../../../../../components/Title';

const TabletHomeScreenPageAppBarComponent = () => (
  <AppBar position="static">
    <Toolbar>
      <Title>
        <PlayerListTitleMessage />
      </Title>
    </Toolbar>
  </AppBar>
);

export default TabletHomeScreenPageAppBarComponent;
