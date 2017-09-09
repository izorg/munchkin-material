import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import cns from 'classnames';

import { noop } from '../../../constants';
import { playerInstance } from '../../../utils/propTypes';

import CloseCircle from '../../icons/CloseCircle';

import Player from '../../../containers/Combat/Player';

import cn from './style.css';

class CombatPlayerSlider extends Component {
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
        className={cn.playerContainer}
        key={props.player.id.toString()}
      >
        <Player
          player={props.player}
          onBonusChange={props.onBonusChange}
        />

        {helper && props.player.id === helper.id && (
          <IconButton
            className={cn.remove}
            onClick={this.handleHelperRemove}
            style={{
              width: 36,
              height: 36,
              padding: 6,
            }}
          >
            <CloseCircle />
          </IconButton>
        )}
      </Paper>
    ));

    return (
      <div className={cns(cn.players, className)}>
        <MediaQuery orientation="portrait">
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              boxSizing: 'border-box',
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
              height: 225,
              width: '100%',
            }}
            enableMouseEvents
            ignoreNativeScroll
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              boxSizing: 'border-box',
              height: 225,
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
  className: PropTypes.string,
  helper: playerInstance,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  player: playerInstance.isRequired,
};

CombatPlayerSlider.defaultProps = {
  className: '',
  helper: null,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onPlayerBonusChange: noop,
};

export default CombatPlayerSlider;
