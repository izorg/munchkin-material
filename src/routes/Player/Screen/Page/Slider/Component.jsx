import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

import PlayerStats from './Stats';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = (theme) => ({
  itemContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },

  item: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    width: '100%',
  },

  stats: {
    flex: 1,
  },

  '@media (orientation: portrait)': {
    item: {
      paddingBottom: 56,
    },
  },

  [theme.breakpoints.up('sm')]: {
    root: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8,
    },

    itemContainer: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },

    item: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },

    '@media (orientation: portrait)': {
      item: {
        maxHeight: 480,
        paddingBottom: 0,
      },

      stats: {
        maxWidth: 300,
      },
    },

    '@media (orientation: landscape)': {
      item: {
        flex: 'none',
        height: 'auto',
        paddingBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
      },

      stats: {
        maxWidth: 400,
      },
    },
  },
});

class PlayerSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: props.initialSlide,
    };

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
      <div className={classes.itemContainer} key={key}>
        <Paper className={classes.item}>
          <PlayerStats className={classes.stats} playerId={playerId} />
        </Paper>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { index } = this.state;

    return (
      <PlayerSwipeableViews
        className={classes.root}
        containerStyle={{
          flex: '1 0 auto',
        }}
        enableMouseEvents
        index={index}
        onChangeIndex={this.handleChangeIndex}
        overscanSlideAfter={1}
        overscanSlideBefore={2}
        slideRenderer={this.slideRenderer}
        slideStyle={{
          display: 'flex',
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
