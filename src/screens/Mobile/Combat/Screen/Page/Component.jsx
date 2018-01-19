import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import noop from '../../../../../utils/noop';
import { classesObject, playerInstance } from '../../../../../utils/propTypes';

import Layout, { LayoutContent, LayoutHeader } from '../../../../../components/Layout';

import AppBar from './AppBar';
import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';

const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },

  players: {
    flex: 1,
  },

  monsters: {
    flex: 1,
  },

  total: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  value: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: '2em',
  },

  versus: {
    margin: '0 0.5em',
  },

  '@media (orientation: landscape)': {
    content: {
      flexDirection: 'row',
    },

    total: {
      flexDirection: 'column',
      width: 50,
    },
  },
});

const CombatScreenPage = ({
  classes,
  helper,
  helperBonus,
  monsters,
  onHelperBonusChange,
  onHelperRemove,
  onMonsterAdd,
  onMonsterRemove,
  onPlayerBonusChange,
  player,
  playerBonus,
}) => (
  <Layout>
    <LayoutHeader>
      <AppBar />
    </LayoutHeader>
    <LayoutContent className={classes.content}>
      <PlayerSlider
        className={classes.players}
        helper={helper}
        onHelperBonusChange={onHelperBonusChange}
        onHelperRemove={onHelperRemove}
        onPlayerBonusChange={onPlayerBonusChange}
        player={player}
      />

      <div className={classes.total}>
        <span className={classes.value}>
          {
            player.level + player.gear + playerBonus +
            (helper ? (helper.level + helper.gear + helperBonus) : 0)
          }
        </span>
        <Typography className={classes.versus} component="span">vs</Typography>
        <span className={classes.value}>
          {monsters.reduce((strength, monster) => strength + monster.level + monster.bonus, 0)}
        </span>
      </div>

      <MonsterSlider
        className={classes.monsters}
        monsters={monsters}
        onMonsterAdd={onMonsterAdd}
        onMonsterRemove={onMonsterRemove}
      />
    </LayoutContent>
  </Layout>
);

CombatScreenPage.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  helper: playerInstance,
  helperBonus: PropTypes.number,
  monsters: PropTypes.arrayOf(PropTypes.object),
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
  playerBonus: PropTypes.number,
};

CombatScreenPage.defaultProps = {
  helper: null,
  helperBonus: 0,
  monsters: [],
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
  playerBonus: 0,
};

export default withStyles(styles)(CombatScreenPage);
