import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import cns from 'classnames';

import { noop } from '../../../constants';
import { playerInstance } from '../../../utils/propTypes';

import CloseCircle from '../../icons/CloseCircle';

import HelperSelector from '../../../containers/Combat/HelperSelector';
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

    return (
      <div className={cns(cn.players, className)}>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          slideStyle={{
            boxSizing: 'border-box',
            padding: '0 16px 16px',
            position: 'relative',
          }}
          style={{
            flexGrow: 1,
            padding: '0 32px',
          }}
          enableMouseEvents
        >
          {playersProps.map(props => (
            <Paper
              key={props.player.id.toString()}
              style={{
                padding: 8,
              }}
            >
              <Player
                player={props.player}
                onBonusChange={props.onBonusChange}
              />

              {helper && props.player.id === helper.id && (
                <IconButton
                  className={cn.remove}
                  onTouchTap={this.handleHelperRemove}
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
          ))}
        </SwipeableViews>

        {!helper && (
          <FloatingActionButton
            containerElement={<Link to={`/player/${player.id}/combat/helpers`} />}
            className={cn.addHelper}
            mini
          >
            <ContentAdd />
          </FloatingActionButton>
        )}

        <Route exact path="/player/:id/combat/helpers">
          {({ match }) => (
            <HelperSelector open={!!match} />
          )}
        </Route>
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
