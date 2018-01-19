import React, { PureComponent } from 'react';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import noop from '../../../../../../utils/noop';
import { classesObject, playerInstance } from '../../../../../../utils/propTypes';

import CloseCircle from '../../../../../../components/icons/CloseCircle';

import Player from '../../../Player';

const styles = {
  players: {
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
  },

  remove: {
    bottom: 16,
    height: 36,
    padding: 6,
    position: 'absolute',
    right: 16,
    width: 36,
  },

  '@media (orientation: landscape)': {
    players: {
      alignItems: 'center',
      overflow: 'hidden',
    },

    playerContainer: {
      paddingLeft: 28,
    },

    remove: {
      right: 8,
      bottom: 8,
    },
  },
};

class CombatPlayerSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleHelperRemove = this.handleHelperRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { helper } = this.props;
    const { index } = this.state;

    if (!helper && nextProps.helper && index === 0) {
      this.setState({
        index: 1,
      });
    }
  }

  handleChangeIndex(index) {
    this.setState({
      index,
    });
  }

  handleHelperRemove() {
    this.setState({
      index: 0,
    });

    this.props.onHelperRemove();
  }

  render() {
    const {
      classes,
      className,
      helper,
      onHelperBonusChange,
      onPlayerBonusChange,
      player,
    } = this.props;

    const { index } = this.state;

    const playersProps = [
      {
        onBonusChange: onPlayerBonusChange,
        player,
      },
    ];

    if (helper) {
      playersProps.push({
        onBonusChange: onHelperBonusChange,
        player: helper,
      });
    }

    const players = playersProps.map(props => (
      <Paper
        className={classes.playerContainer}
        key={props.player.id.toString()}
      >
        <Player
          onBonusChange={props.onBonusChange}
          player={props.player}
        />

        {helper && props.player.id === helper.id && (
          <IconButton
            className={classes.remove}
            onClick={this.handleHelperRemove}
          >
            <CloseCircle />
          </IconButton>
        )}
      </Paper>
    ));

    return (
      <div className={cns(classes.players, className)}>
        <MediaQuery orientation="portrait">
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              padding: '0 16px 16px',
              position: 'relative',
            }}
            style={{
              flex: 1,
              padding: '0 32px',
            }}
          >
            {players}
          </SwipeableViews>
        </MediaQuery>

        <MediaQuery orientation="landscape">
          <SwipeableViews
            axis="y"
            containerStyle={{
              height: 215,
              width: '100%',
            }}
            enableMouseEvents
            ignoreNativeScroll
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              height: 215,
              padding: '8px 8px 8px 0',
              position: 'relative',
            }}
            style={{
              alignItems: 'center',
              display: 'flex',
              overflowY: 'visible',
              width: '100%',
            }}
          >
            {players}
          </SwipeableViews>
        </MediaQuery>
      </div>
    );
  }
}

CombatPlayerSlider.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  helper: playerInstance,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

CombatPlayerSlider.defaultProps = {
  className: '',
  helper: null,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onPlayerBonusChange: noop,
};

export default withStyles(styles)(CombatPlayerSlider);
