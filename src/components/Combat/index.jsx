import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Monster from 'munchkin-core/lib/classes/Monster';
import { Player } from 'munchkin-core';

import { noop } from '../../constants';

import CombatMonster from './Monster';
import Counter from '../Counter';
import { Layout, LayoutContent, LayoutHeader } from '../Layout';
import AppBar from '../material-ui/AppBar';
import HelperSelector from '../../containers/HelperSelector';

import cn from './style.css';

class Combat extends PureComponent {
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
            {helper && (
              <div className={cn.stats}>
                <Counter value={helper.level} title="Level" />
                <Counter value={helper.gear} title="Gear" />
                <Counter value={helperBonus} title="Bonus" />
              </div>
            )}
            {!helper && (
              <FloatingActionButton
                containerElement={<Link to={`/player/${player.id}/combat/helpers`} />}
                mini
              >
                <ContentAdd />
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
  monsters: PropTypes.arrayOf(PropTypes.instanceOf(Monster)),
  onBack: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
  playerBonus: PropTypes.number,
};

Combat.defaultProps = {
  helper: null,
  helperBonus: 0,
  monsters: [],
  onBack: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  playerBonus: 0,
};

export default Combat;
