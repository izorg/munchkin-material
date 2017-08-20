import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Monster from 'munchkin-core/lib/classes/Monster';
import { Player } from 'munchkin-core';

import { noop } from '../../constants';

import CombatMonster from '../CombatMonster';
import Counter from '../Counter';
import { Layout, LayoutContent, LayoutHeader } from '../Layout';
import AppBar from '../material-ui/AppBar';
import HelperSelector from '../../containers/HelperSelector';

import cn from './style.css';

class Combat extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      helperSelectorOpen: false,
    };
  }

  componentWillMount() {
    this.handleHelperAdd = this.handleHelperAdd.bind(this);
    this.handleHelperSelectorClose = this.handleHelperSelectorClose.bind(this);
  }

  handleHelperAdd() {
    this.setState({
      helperSelectorOpen: true,
    });
  }

  handleHelperSelectorClose() {
    this.setState({
      helperSelectorOpen: false,
    });
  }

  render() {
    const {
      helper,
      monsters,
      onBack,
      onMonsterAdd,
      player,
      playerBonus,
      onMonsterRemove,
    } = this.props;

    const { helperSelectorOpen } = this.state;

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
        <LayoutContent>
          <div>
            <p>{player.name}</p>
            <div className={cn.stats}>
              <Counter value={player.level} title="Level" />
              <Counter value={player.gear} title="Gear" />
              <Counter value={playerBonus} title="Bonus" />
            </div>
            {!helper && (
              <FloatingActionButton mini>
                <ContentAdd onTouchTap={this.handleHelperAdd} />
              </FloatingActionButton>
            )}
          </div>
          <div>
            {player.level + player.gear + playerBonus} vs.
            {monsters.reduce((strength, monster) => strength + monster.level + monster.bonus, 0)}
            <div>
              {
                monsters.map(monster => (
                  <CombatMonster
                    key={monster.id.toString()}
                    onRemove={() => onMonsterRemove(monster.id)}
                  />
                ))
              }
              <FloatingActionButton mini onTouchTap={onMonsterAdd}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>

          <HelperSelector
            onRequestClose={this.handleHelperSelectorClose}
            open={helperSelectorOpen}
          />
        </LayoutContent>
      </Layout>
    );
  }
}

Combat.propTypes = {
  helper: PropTypes.instanceOf(Player),
  monsters: PropTypes.arrayOf(PropTypes.instanceOf(Monster)),
  onBack: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
  playerBonus: PropTypes.number,
};

Combat.defaultProps = {
  helper: null,
  monsters: [],
  onBack: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  playerBonus: 0,
};

export default Combat;
