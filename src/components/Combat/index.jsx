import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Player } from 'munchkin-core';

import { noop } from '../../constants';

import Counter from '../Counter';
import { Layout, LayoutContent, LayoutHeader } from '../Layout';
import AppBar from '../material-ui/AppBar';

import cn from './style.css';

const Combat = ({ onBack, player }) => (
  <Layout>
    <LayoutHeader>
      <AppBar
        iconElementLeft={(
          <IconButton onTouchTap={onBack}>
            <NavigationArrowBack />
          </IconButton>
        )}
        title="Combat"
      />
    </LayoutHeader>
    <LayoutContent>
      <div>
        <p>{player.name}</p>
        <div className={cn.stats}>
          <Counter value={player.level} title="Level" />
          <Counter value={player.gear} title="Gear" />
        </div>
      </div>
    </LayoutContent>
  </Layout>
);

Combat.propTypes = {
  onBack: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
};

Combat.defaultProps = {
  onBack: noop,
};

export default Combat;
