import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { goBack, replace } from 'react-router-redux';
import Slide from 'material-ui/transitions/Slide';

import { setActivePlayer, throwDice } from '../../actions';
import CombatButton from '../Combat/Button';
import Slider from '../../components/Player/Slider';

const mapStateToProps = ({ app: { activePlayerId }, playerList, players }) => ({
  players: playerList.map(id => players[id]),
  selectedPlayer: players[activePlayerId],
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(goBack()),
  onDiceClick: () => {
    dispatch(throwDice());
  },
  onPlayerChange: (player) => {
    dispatch(setActivePlayer(player.id));
    dispatch(replace(`/player/${player.id}`));
  },
});

const PlayerSlider = ({ in: inProps }) => [
  <Slide
    appear={false}
    direction="left"
    in={inProps}
    key="screen"
    mountOnEnter
    unmountOnExit
  >
    <Slider />
  </Slide>,
  <CombatButton key="fab" />,
];

const ConnectedPlayerSlider = connect(mapStateToProps, mapDispatchToProps)(PlayerSlider);

const PlayerSliderRoute = () => (
  <Route path="/player/:id">
    {({ match }) => <ConnectedPlayerSlider in={Boolean(match)} />}
  </Route>
);

export default PlayerSliderRoute;
