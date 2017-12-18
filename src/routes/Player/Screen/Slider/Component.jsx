import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { noop } from '../../../../constants';
import { classesObject, playerInstance } from '../../../../utils/propTypes';

import PlayerStats from '../Stats';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = theme => ({
  item: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
});

class PlayerSlider extends PureComponent {
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
    const { classes, players } = this.props;
    const playerIndex = this.getPlayerIndex(index);
    const player = players[playerIndex];

    return (
      <PlayerStats className={classes.item} key={key} player={player} />
    );
  }

  render() {
    const { initialSlide } = this.state;

    return (
      <PlayerSwipeableViews
        onChangeIndex={this.handleChangeIndex}
        containerStyle={{
          flexGrow: 1,
        }}
        enableMouseEvents
        index={initialSlide}
        overscanSlideAfter={1}
        overscanSlideBefore={1}
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
    );
  }
}

PlayerSlider.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onPlayerChange: PropTypes.func,
  players: PropTypes.arrayOf(playerInstance).isRequired,
  selectedPlayer: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

PlayerSlider.defaultProps = {
  onPlayerChange: noop,
};

export default withStyles(styles)(PlayerSlider);
