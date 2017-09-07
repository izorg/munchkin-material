import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui-icons/Add';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';

import EmoticonDevil from '../../icons/EmoticonDevil';
import { noop } from '../../../constants';
import HelperSelector from '../../../containers/Combat/HelperSelector';

import Fade from './Fade';

import cn from './style.css';

class CombatHelperButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleMonsterAdd = this.handleMonsterAdd.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.helper) {
      this.setState({
        expanded: false,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    const { node } = this;
    const { target } = e;

    if (node === target || !node.contains(target)) {
      this.setState({
        expanded: false,
      });
    }
  }

  handleMonsterAdd() {
    const { onMonsterAdd } = this.props;

    onMonsterAdd();

    this.setState({
      expanded: false,
    });
  }

  handleClick() {
    const { helper } = this.props;
    const { expanded } = this.state;

    if (helper) {
      this.setState({
        expanded: !expanded,
      });
    } else {
      this.handleMonsterAdd();
    }
  }

  render() {
    const { helper, playerId } = this.props;
    const { expanded } = this.state;

    return (
      <div
        className={cn.container}
        ref={(node) => {
          this.node = node;
        }}
      >
        <FloatingActionButton className={cn.button} onClick={this.handleClick}>
          {helper ? <ContentAdd className={expanded && cn.expanded} /> : <EmoticonDevil />}
        </FloatingActionButton>

        <TransitionGroup>
          {helper && expanded && (
            <Fade>
              <FloatingActionButton className={cn.monster} mini onClick={this.handleMonsterAdd}>
                <EmoticonDevil />
              </FloatingActionButton>
            </Fade>
          )}

          {helper && expanded && (
            <Fade enterDelay={50}>
              <FloatingActionButton
                className={cn.helper}
                containerElement={<Link to={`/player/${playerId}/combat/helpers`} />}
                mini
              >
                <SocialPersonAdd />

                <Route exact path="/player/:id/combat/helpers">
                  {({ match }) => (
                    <HelperSelector open={!!match} />
                  )}
                </Route>
              </FloatingActionButton>
            </Fade>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

CombatHelperButton.propTypes = {
  helper: PropTypes.bool,
  onMonsterAdd: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

CombatHelperButton.defaultProps = {
  helper: false,
  onMonsterAdd: noop,
};

export default CombatHelperButton;
