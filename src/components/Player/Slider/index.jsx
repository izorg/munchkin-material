import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import cns from 'classnames';
import { Player } from 'munchkin-core';

import DiceMultipleIcon from '../../icons/dice/multiple';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import AppBar from '../../material-ui/AppBar';
import { noop } from '../../../constants';
import DiceDialog from '../../../containers/DiceDialog';
import PlayerStats from '../../../containers/Player/Stats';
import { ios } from '../../../helpers/platforms';

import banner from './banner';
import cn from './style.css';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

class PlayerSlider extends Component {
  constructor(props) {
    super(props);

    const { players, selectedPlayer } = props;

    this.state = {
      initialSlide: players.indexOf(selectedPlayer),
    };
  }

  componentWillMount() {
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.slideRenderer = this.slideRenderer.bind(this);
  }

  getPlayerIndex(index) {
    const { players } = this.props;
    let playerIndex = index % players.length;

    if (playerIndex < 0) {
      playerIndex = players.length + playerIndex;
    }

    return playerIndex;
  }

  handleChangeIndex(index) {
    const { onPlayerChange, players } = this.props;
    const playerIndex = this.getPlayerIndex(index);

    onPlayerChange(players[playerIndex]);

    this.setState({
      initialSlide: index,
    });
  }

  slideRenderer({ key, index }) {
    const { players } = this.props;
    const playerIndex = this.getPlayerIndex(index);
    const player = players[playerIndex];

    return (
      <PlayerStats className={cn.item} key={key} player={player} />
    );
  }

  render() {
    const {
      bannerVisible,
      onBack,
      onDiceTouchTap,
      selectedPlayer,
    } = this.props;

    const { initialSlide } = this.state;

    const backButton = (
      <IconButton onTouchTap={onBack}>
        <NavigationArrowBack />
      </IconButton>
    );

    const diceButton = (
      <IconButton onTouchTap={() => onDiceTouchTap()} style={{ marginLeft: ios ? 8 : undefined }}>
        <DiceMultipleIcon />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={backButton}
            iconElementRight={diceButton}
            title={selectedPlayer.name}
          />
        </LayoutHeader>
        <LayoutContent
          className={cns(cn.sliderContent, { [cn.bannerVisible]: bannerVisible })}
        >
          <PlayerSwipeableViews
            onChangeIndex={this.handleChangeIndex}
            containerStyle={{
              flexGrow: 1,
            }}
            enableMouseEvents
            index={initialSlide}
            slideRenderer={this.slideRenderer}
            slideStyle={{
              display: 'flex',
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          />

          <DiceDialog />
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerSlider.propTypes = {
  bannerVisible: PropTypes.bool,
  onBack: PropTypes.func,
  onDiceTouchTap: PropTypes.func,
  onPlayerChange: PropTypes.func,
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)).isRequired,
  selectedPlayer: PropTypes.instanceOf(Player).isRequired,
};

PlayerSlider.defaultProps = {
  bannerVisible: false,
  onBack: noop,
  onDiceTouchTap: noop,
  onPlayerChange: noop,
};

export default banner(PlayerSlider);
