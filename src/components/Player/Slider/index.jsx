import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';

import DiceMultipleIcon from '../../icons/dice/multiple';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import { noop } from '../../../constants';
import DiceDialog from '../../../containers/DiceDialog';
import PlayerStats from '../../../containers/Player/Stats';
import { playerInstance } from '../../../utils/propTypes';

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
      onBack,
      onDiceClick,
      selectedPlayer,
    } = this.props;

    const { initialSlide } = this.state;

    const backButton = (
      <IconButton color="contrast" onClick={onBack}>
        <NavigationArrowBack />
      </IconButton>
    );

    const diceButton = (
      <IconButton color="contrast" onClick={onDiceClick}>
        <DiceMultipleIcon />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar disableGutters>
              {backButton}
              <Typography
                color="inherit"
                noWrap
                style={{ flex: 1 }}
                type="title"
              >
                {selectedPlayer.name}
              </Typography>
              {diceButton}
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent className={cn.sliderContent}>
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
  onBack: PropTypes.func,
  onDiceClick: PropTypes.func,
  onPlayerChange: PropTypes.func,
  players: PropTypes.arrayOf(playerInstance).isRequired,
  selectedPlayer: playerInstance.isRequired,
};

PlayerSlider.defaultProps = {
  onBack: noop,
  onDiceClick: noop,
  onPlayerChange: noop,
};

export default PlayerSlider;
