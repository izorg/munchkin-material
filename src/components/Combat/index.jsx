import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Player } from 'munchkin-core';

import { noop } from '../../constants';
import { monsterInstance } from '../../utils/propTypes';

import CloseCircle from '../icons/CloseCircle';

import MonsterSlider from './MonsterSlider';
import Counter from '../Counter';
import { Layout, LayoutContent, LayoutHeader } from '../Layout';
import AppBar from '../material-ui/AppBar';
import HelperSelector from '../../containers/Combat/HelperSelector';

import cn from './style.css';

class Combat extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleHelperRemove = this.handleHelperRemove.bind(this);

    this.handleHelperGearDecrement = this.handleHelperGearDecrement.bind(this);
    this.handleHelperGearIncrement = this.handleHelperGearIncrement.bind(this);
    this.handleHelperLevelDecrement = this.handleHelperLevelDecrement.bind(this);
    this.handleHelperLevelIncrement = this.handleHelperLevelIncrement.bind(this);

    this.handlePlayerGearDecrement = this.handlePlayerGearDecrement.bind(this);
    this.handlePlayerGearIncrement = this.handlePlayerGearIncrement.bind(this);
    this.handlePlayerLevelDecrement = this.handlePlayerLevelDecrement.bind(this);
    this.handlePlayerLevelIncrement = this.handlePlayerLevelIncrement.bind(this);
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

  handleHelperBonusChange(value) {
    const { helperBonus, onHelperBonusChange } = this.props;

    onHelperBonusChange(helperBonus + value);
  }

  handleHelperGearDecrement() {
    const { helper, onHelperGearDecrement } = this.props;

    onHelperGearDecrement(helper);
  }

  handleHelperGearIncrement() {
    const { helper, onHelperGearIncrement } = this.props;

    onHelperGearIncrement(helper);
  }

  handleHelperLevelDecrement() {
    const { helper, onHelperLevelDecrement } = this.props;

    onHelperLevelDecrement(helper);
  }

  handleHelperLevelIncrement() {
    const { helper, onHelperLevelIncrement } = this.props;

    onHelperLevelIncrement(helper);
  }

  handleHelperRemove() {
    this.setState({
      index: 0,
    });

    this.props.onHelperRemove();
  }

  handlePlayerBonusChange(value) {
    const { playerBonus, onPlayerBonusChange } = this.props;

    onPlayerBonusChange(playerBonus + value);
  }

  handlePlayerGearDecrement() {
    const { player, onPlayerGearDecrement } = this.props;

    onPlayerGearDecrement(player);
  }

  handlePlayerGearIncrement() {
    const { player, onPlayerGearIncrement } = this.props;

    onPlayerGearIncrement(player);
  }

  handlePlayerLevelDecrement() {
    const { player, onPlayerLevelDecrement } = this.props;

    onPlayerLevelDecrement(player);
  }

  handlePlayerLevelIncrement() {
    const { player, onPlayerLevelIncrement } = this.props;

    onPlayerLevelIncrement(player);
  }

  render() {
    const {
      helper,
      helperBonus,
      monsters,
      onBack,
      onMonsterAdd,
      player,
      playerBonus,
      onMonsterRemove,
    } = this.props;

    const { index } = this.state;

    const players = [
      <div className={cn.player} key={player.id.toString()}>
        <div className={cn.name}>{player.name}</div>
        <div className={cn.stats}>
          <Counter
            className={cn.item}
            compact
            onDecrement={this.handlePlayerLevelDecrement}
            onIncrement={this.handlePlayerLevelIncrement}
            title="Level"
            value={player.level}
          />
          <Counter
            className={cn.item}
            compact
            onDecrement={this.handlePlayerGearDecrement}
            onIncrement={this.handlePlayerGearIncrement}
            title="Gear"
            value={player.gear}
          />
          <Counter
            className={cn.item}
            compact
            onDecrement={() => this.handlePlayerBonusChange(-1)}
            onIncrement={() => this.handlePlayerBonusChange(+1)}
            title="Bonus"
            value={playerBonus}
          />
        </div>
      </div>,
    ];

    if (helper) {
      players.push(
        <div className={cn.helper} key={helper.id.toString()}>
          <div className={cn.name}>{helper.name}</div>
          <div className={cn.stats}>
            <Counter
              className={cn.item}
              compact
              onDecrement={this.handleHelperLevelDecrement}
              onIncrement={this.handleHelperLevelIncrement}
              title="Level"
              value={helper.level}
            />
            <Counter
              className={cn.item}
              compact
              onDecrement={this.handleHelperGearDecrement}
              onIncrement={this.handleHelperGearIncrement}
              title="Gear"
              value={helper.gear}
            />
            <Counter
              className={cn.item}
              compact
              onDecrement={() => this.handleHelperBonusChange(-1)}
              onIncrement={() => this.handleHelperBonusChange(+1)}
              title="Bonus"
              value={helperBonus}
            />
          </div>
        </div>,
      );
    }

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={(
              <IconButton onTouchTap={onBack}>
                <NavigationArrowBack />
              </IconButton>
            )}
            title="Combat"
          />
        </LayoutHeader>
        <LayoutContent className={cn.content}>
          <div className={cn.players}>
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
              {players.map((playerCmp, playerIndex) => (
                <Paper
                  key={playerCmp.key}
                  style={{
                    padding: 8,
                  }}
                >
                  {playerCmp}

                  {!!playerIndex && (
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
          </div>

          <div className={cn.total}>
            <span className={cn.value}>
              {
                player.level +
                player.gear +
                playerBonus +
                (helper ? (helper.level + helper.gear + helperBonus) : 0)
              }
            </span>
            <span className={cn.versus}>vs</span>
            <span className={cn.value}>
              {monsters.reduce((strength, monster) => strength + monster.level + monster.bonus, 0)}
            </span>
          </div>

          <MonsterSlider
            className={cn.monsters}
            monsters={monsters}
            onMonsterAdd={onMonsterAdd}
            onMonsterRemove={onMonsterRemove}
          />

          <Route exact path="/player/:id/combat/helpers">
            {({ match }) => (
              <HelperSelector open={!!match} />
            )}
          </Route>
        </LayoutContent>
      </Layout>
    );
  }
}

Combat.propTypes = {
  helper: PropTypes.instanceOf(Player),
  helperBonus: PropTypes.number,
  onHelperGearDecrement: PropTypes.func,
  onHelperGearIncrement: PropTypes.func,
  onHelperLevelDecrement: PropTypes.func,
  onHelperLevelIncrement: PropTypes.func,
  monsters: PropTypes.arrayOf(monsterInstance),
  onBack: PropTypes.func,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  onPlayerGearDecrement: PropTypes.func,
  onPlayerGearIncrement: PropTypes.func,
  onPlayerLevelDecrement: PropTypes.func,
  onPlayerLevelIncrement: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
  playerBonus: PropTypes.number,
};

Combat.defaultProps = {
  helper: null,
  helperBonus: 0,
  onHelperGearDecrement: noop,
  onHelperGearIncrement: noop,
  onHelperLevelDecrement: noop,
  onHelperLevelIncrement: noop,
  monsters: [],
  onBack: noop,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
  onPlayerGearDecrement: noop,
  onPlayerGearIncrement: noop,
  onPlayerLevelDecrement: noop,
  onPlayerLevelIncrement: noop,
  playerBonus: 0,
};

export default Combat;
