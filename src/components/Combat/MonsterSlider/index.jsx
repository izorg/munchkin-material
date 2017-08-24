import React, { PureComponent } from 'react';
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

    return (
      <div className={cns(cn.monsters, className)}>
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
            flexGrow: 1,
            padding: '0 32px',
          }}
        >
          {monsters.map((monster, monsterIndex) => (
            <Paper
              key={monster.id.toString()}
              style={{
                padding: 8,
              }}
            >
              <Monster
                key={monster.id.toString()}
                monster={monster}
                title={`Monster ${monsterIndex + 1}`}
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
          ))}
        </SwipeableViews>

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
