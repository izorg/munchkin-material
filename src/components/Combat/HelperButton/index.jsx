import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/Button';
import { styles as iconStyles } from 'material-ui/SvgIcon/SvgIcon';
import { withStyles } from 'material-ui/styles';
import ContentAdd from 'material-ui-icons/Add';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import cns from 'classnames';

import EmoticonDevil from '../../icons/EmoticonDevil';
import { noop } from '../../../constants';
import HelperSelector from '../../../containers/Combat/HelperSelector';
import { classesObject } from '../../../utils/propTypes';

import Fade from './Fade';

const styles = (theme) => {
  const transition = theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  });

  return {
    container: {
      position: 'relative',
    },

    miniContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
    },

    button: {
      position: 'relative',
    },

    icon: {
      transition: `${transition}, ${iconStyles(theme).root.transition}`,
    },

    expanded: {
      transform: 'rotate(45deg)',
    },

    monster: {
      left: 8,
      position: 'absolute',
      top: -64,
    },

    helper: {
      left: 8,
      position: 'absolute',
      top: -128,
    },

    mini: {
      height: 40,
      width: 40,
    },
  };
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
        className={classes.container}
        ref={(node) => {
          this.node = node;
        }}
      >
        <TransitionGroup className={classes.miniContainer}>
          {helper && expanded && (
            <Fade>
              <div className={classes.monster}>
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
              <div className={classes.helper}>
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

        <FloatingActionButton
          className={classes.button}
          color="primary"
          fab
          onClick={this.handleClick}
        >
          {helper ? (
            <ContentAdd className={cns(classes.icon, { [classes.expanded]: expanded })} />
          ) : <EmoticonDevil />}
        </FloatingActionButton>
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
