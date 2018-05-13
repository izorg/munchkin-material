import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash';

import PlayerStats from './Stats';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = (theme) => ({
  item: {
    flexGrow: 1,
    height: '100%',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    width: '100%',

    '@media (orientation: portrait)': {
      paddingBottom: 56,
    },

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },

    [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
      maxHeight: 480,
      maxWidth: 400,
      paddingBottom: 0,
    },

    [`${theme.breakpoints.up('sm')} and (orientation: landscape)`]: {
      maxWidth: 600,
    },
  },
});

class PlayerSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: props.initialSlide,
    };
  }

  componentWillMount() {
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.slideRenderer = this.slideRenderer.bind(this);
  }

  getPlayerIndex(index) {
    const { playerList } = this.props;
    let playerIndex = index % playerList.length;

    if (playerIndex < 0) {
      playerIndex = playerList.length + playerIndex;
    }

    return playerIndex;
  }

  handleChangeIndex(index) {
    const { onPlayerChange, playerList } = this.props;
    const playerIndex = this.getPlayerIndex(index);

    onPlayerChange(playerList[playerIndex]);

    this.setState({
      index,
    });
  }

  slideRenderer({ key, index }) {
    const { classes, playerList } = this.props;
    const playerIndex = this.getPlayerIndex(index);
    const playerId = playerList[playerIndex];

    return (
      <PlayerStats className={classes.item} key={key} playerId={playerId} />
    );
  }

  render() {
    const { index } = this.state;

    return (
      <PlayerSwipeableViews
        onChangeIndex={this.handleChangeIndex}
        containerStyle={{
          flex: '1 0 auto',
        }}
        enableMouseEvents
        index={index}
        overscanSlideAfter={1}
        overscanSlideBefore={1}
        slideRenderer={this.slideRenderer}
        slideStyle={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
  initialSlide: PropTypes.number.isRequired,
  onPlayerChange: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PlayerSlider.defaultProps = {
  onPlayerChange: noop,
};

export default withStyles(styles)(PlayerSlider);
