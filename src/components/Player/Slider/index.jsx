import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';

import DiceIconButton from '../../../containers/DiceButton';
import Layout, { LayoutContent, LayoutHeader } from '../../Layout';
import Title from '../../Title';
import { noop } from '../../../constants';
import PlayerStats from '../../../containers/Player/Stats';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = {
  sliderContent: {
    display: 'flex',
  },

  item: {
    flexGrow: 1,
  },

  '@media (orientation: portrait)': {
    sliderContent: {
      paddingBottom: 56,
    },
  },

  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },
};

class PlayerSlider extends PureComponent {
  constructor(props) {
    super(props);

    const { players, selectedPlayer } = props;

    this.state = {
      disableDiceTooltip: false,
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
    const { classes, players } = this.props;
    const playerIndex = this.getPlayerIndex(index);
    const player = players[playerIndex];

    return (
      <PlayerStats className={classes.item} key={key} player={player} />
    );
  }

  render() {
    const {
      classes,
      className,
      onBack,
      onDiceClick,
      selectedPlayer,
    } = this.props;

    const { initialSlide } = this.state;

    return (
      <Layout className={className}>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar>
              <IconButton className={classes.leftButton} color="contrast" onClick={onBack}>
                <NavigationArrowBack />
              </IconButton>

              <Title>
                {selectedPlayer.name}
              </Title>

              <DiceIconButton
                className={classes.rightButton}
                color="contrast"
                disableTriggerFocus={this.state.disableDiceTooltip}
                onClick={onDiceClick}
              />
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent className={classes.sliderContent}>
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
              overflow: 'hidden',
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          />
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerSlider.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  onBack: PropTypes.func,
  onDiceClick: PropTypes.func,
  onPlayerChange: PropTypes.func,
  players: PropTypes.arrayOf(playerInstance).isRequired,
  selectedPlayer: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

PlayerSlider.defaultProps = {
  className: '',
  onBack: noop,
  onDiceClick: noop,
  onPlayerChange: noop,
};

export default withStyles(styles)(PlayerSlider);
