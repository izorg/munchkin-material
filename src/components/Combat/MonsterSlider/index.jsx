import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import cns from 'classnames';

import { noop } from '../../../constants';
import { monsterInstance } from '../../../utils/propTypes';

import CloseCircle from '../../icons/CloseCircle';
import Monster from '../../../containers/Combat/Monster';

import cn from './style.css';

class CombatMonsterSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleAdd() {
    const { monsters, onMonsterAdd } = this.props;
    const monsterCount = monsters.length;

    onMonsterAdd();

    if (monsterCount) {
      this.setState({
        index: monsters.length,
      });
    }
  }

  handleChangeIndex(index) {
    this.setState({
      index,
    });
  }

  handleRemove(monsterId) {
    const { monsters, onMonsterRemove } = this.props;
    const index = monsters.map(({ id }) => id).indexOf(monsterId);

    if (index > 0) {
      this.setState({
        index: index - 1,
      });
    }

    onMonsterRemove(monsterId);
  }

  render() {
    const { className, monsters } = this.props;
    const { index } = this.state;

    const views = monsters.map((monster, monsterIndex) => (
      <Paper
        className={cn.monsterContainer}
        key={monster.id.toString()}
      >
        <Monster
          key={monster.id.toString()}
          monster={monster}
          title={<FormattedMessage
            id="combat.monster"
            defaultMessage="Monster {number}"
            values={{
              number: monsterIndex + 1,
            }}
          />}
        />

        {monsters.length > 1 && monsterIndex === index && (
          <IconButton
            className={cn.remove}
            onTouchTap={() => this.handleRemove(monster.id)}
            style={{
              width: 36,
              height: 36,
              padding: 6,
            }}
          >
            <CloseCircle />
          </IconButton>)}
      </Paper>
    ));

    return (
      <div className={cns(cn.monsters, className)}>
        <MediaQuery orientation="portrait">
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              boxSizing: 'border-box',
              padding: '16px 16px 0',
              position: 'relative',
            }}
            style={{
              flex: 1,
              padding: '0 48px',
            }}
          >
            {views}
          </SwipeableViews>
        </MediaQuery>

        <MediaQuery orientation="landscape">
          <SwipeableViews
            axis="y"
            containerStyle={{
              height: 221,
              width: '100%',
            }}
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              boxSizing: 'border-box',
              padding: '8px 0 8px 8px',
              position: 'relative',
            }}
            style={{
              alignItems: 'center',
              boxSizing: 'border-box',
              display: 'flex',
              padding: '16px 0',
              width: '100%',
            }}
          >
            {views}
          </SwipeableViews>
        </MediaQuery>

        <FloatingActionButton
          className={cn.add}
          mini
          onTouchTap={this.handleAdd}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

CombatMonsterSlider.propTypes = {
  className: PropTypes.string,
  monsters: PropTypes.arrayOf(monsterInstance),
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
};

CombatMonsterSlider.defaultProps = {
  className: '',
  monsters: [],
  onMonsterAdd: noop,
  onMonsterRemove: noop,
};

export default CombatMonsterSlider;
