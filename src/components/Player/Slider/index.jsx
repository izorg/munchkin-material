import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import cns from 'classnames';
import { Player } from 'munchkin';

import cn from './style.css';

import banner from './banner';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import AppBar from '../../material-ui/AppBar';
import { noop } from '../../../constants';
import PlayerStats from '../../../containers/Player/Stats';


class PlayerSlider extends Component {
  componentWillMount() {
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleChangeIndex(index) {
    const { onPlayerChange, players } = this.props;

    onPlayerChange(players[index]);
  }

  render() {
    const {
      bannerVisible,
      onBack,
      onDelete,
      players,
      selectedPlayer,
    } = this.props;

    if (!selectedPlayer) {
      return null;
    }

    const backButton = (
      <IconButton onTouchTap={onBack}>
        <NavigationArrowBack />
      </IconButton>
    );

    const deleteButton = (
      <IconButton onTouchTap={() => onDelete(selectedPlayer)}>
        <ActionDelete />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={backButton}
            iconElementRight={deleteButton}
            title={selectedPlayer.name}
          />
        </LayoutHeader>
        <LayoutContent className={cns(cn.sliderContent, { [cn.bannerVisible]: bannerVisible })}>
          <Slider
            afterChange={this.handleChangeIndex}
            arrows={false}
            className={cn.slider}
            initialSlide={players.indexOf(selectedPlayer)}
            speed={300}
          >
            {players.map(player => (
              <div className={cn.item} key={player.id}>
                <PlayerStats player={player} />
              </div>
            ))}
          </Slider>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerSlider.propTypes = {
  bannerVisible: PropTypes.bool,
  onBack: PropTypes.func,
  onDelete: PropTypes.func,
  onPlayerChange: PropTypes.func,
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)).isRequired,
  selectedPlayer: PropTypes.instanceOf(Player),
};

PlayerSlider.defaultProps = {
  bannerVisible: false,
  onBack: noop,
  onDelete: noop,
  onPlayerChange: noop,
  selectedPlayer: null,
};

export default banner(PlayerSlider);
