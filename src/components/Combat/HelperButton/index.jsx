import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/Button';
import ContentAdd from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';

import EmoticonDevil from '../../icons/EmoticonDevil';
import { noop } from '../../../constants';
import HelperSelector from '../../../containers/Combat/HelperSelector';
import { classesObject } from '../../../utils/propTypes';

import Fade from './Fade';

import cn from './style.css';

const styles = {
  mini: {
    height: 40,
    width: 40,
  },
};

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
    const { classes, helper, playerId } = this.props;
    const { expanded } = this.state;

    return (
      <div
        className={cn.container}
        ref={(node) => {
          this.node = node;
        }}
      >
        <FloatingActionButton
          className={cn.button}
          color="primary"
          fab
          onClick={this.handleClick}
        >
          {helper ? <ContentAdd className={expanded ? cn.expanded : ''} /> : <EmoticonDevil />}
        </FloatingActionButton>

        <TransitionGroup className={cn.miniContainer}>
          {helper && expanded && (
            <Fade>
              <div className={cn.monster}>
                <FloatingActionButton
                  className={classes.mini}
                  color="primary"
                  fab
                  onClick={this.handleMonsterAdd}
                >
                  <EmoticonDevil />
                </FloatingActionButton>
              </div>
            </Fade>
          )}

          {helper && expanded && (
            <Fade enterDelay={50}>
              <div className={cn.helper}>
                <FloatingActionButton
                  className={classes.mini}
                  color="primary"
                  component={Link}
                  fab
                  to={`/player/${playerId}/combat/helpers`}
                >
                  <SocialPersonAdd />

                  <Route exact path="/player/:id/combat/helpers">
                    {({ match }) => (
                      <HelperSelector open={!!match} />
                    )}
                  </Route>
                </FloatingActionButton>
              </div>
            </Fade>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

CombatHelperButton.propTypes = {
  classes: classesObject.isRequired,
  helper: PropTypes.bool,
  onMonsterAdd: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

CombatHelperButton.defaultProps = {
  helper: false,
  onMonsterAdd: noop,
};

export default withStyles(styles)(CombatHelperButton);
