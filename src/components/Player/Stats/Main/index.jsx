import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { Player } from 'munchkin';

import cn from './style.css';

import Gender from '../../../Gender';
import { noop } from '../../../../constants';

const styles = {
  small: {
    width: 64,
    height: 64,
    padding: 12,
  },
  smallIcon: {
    width: 36,
    height: 36,
  },
};

const Main = ({ onGenderToggle, player }) => (
  <div className={cn.counter}>
    <div className={cn.title}>
      <FormattedMessage id="player.stats.strength" defaultMessage="Strength" />
    </div>

    <div className={cn.value}>
      {player.strength}
    </div>

    <IconButton
      iconStyle={styles.smallIcon}
      onTouchTap={onGenderToggle}
      style={styles.small}
    >
      <Gender gender={player.gender} />
    </IconButton>
  </div>
);

Main.propTypes = {
  onGenderToggle: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
};

Main.defaultProps = {
  onGenderToggle: noop,
};

export default Main;
