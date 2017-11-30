import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';

import DiceIconButton from '../../containers/DiceButton';
import { noop } from '../../constants';
import { classesObject, monsterInstance, playerInstance } from '../../utils/propTypes';

import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';
import Layout, { LayoutContent, LayoutHeader } from '../Layout';
import Title from '../Title';

const styles = theme => ({
  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },

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

const Combat = ({
  classes,
  className,
  helper,
  helperBonus,
  monsters,
  onBack,
  onDiceClick,
  onHelperBonusChange,
  onHelperRemove,
  onMonsterAdd,
  onMonsterRemove,
  onPlayerBonusChange,
  player,
  playerBonus,
}) => (
  <Layout className={className}>
    <LayoutHeader>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton className={classes.leftButton} color="contrast" onClick={onBack}>
            <NavigationArrowBack />
          </IconButton>

          <Title>
            <FormattedMessage id="combat" defaultMessage="Combat" />
          </Title>

          <DiceIconButton
            className={classes.rightButton}
            color="contrast"
            onClick={() => onDiceClick(player)}
          />
        </Toolbar>
      </AppBar>
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

Combat.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  helper: playerInstance,
  helperBonus: PropTypes.number,
  monsters: PropTypes.arrayOf(monsterInstance),
  onBack: PropTypes.func,
  onDiceClick: PropTypes.func,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
  playerBonus: PropTypes.number,
};

Combat.defaultProps = {
  className: '',
  helper: null,
  helperBonus: 0,
  monsters: [],
  onBack: noop,
  onDiceClick: noop,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
  playerBonus: 0,
};

export default withStyles(styles)(Combat);
