import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { styles as iconStyles } from 'material-ui/SvgIcon/SvgIcon';
import Backdrop from 'material-ui/internal/Backdrop';
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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { expanded, helper, onAdd, onBackdropClick, onMonsterAdd, playerId } = this.props;

    if (expanded) {
      onBackdropClick();
    } else if (helper) {
      onAdd(playerId);
    } else {
      onMonsterAdd();
    }
  }

  render() {
    const { classes, expanded, helper, onBackdropClick, onMonsterAdd, playerId } = this.props;

    return (
      <div
        className={classes.container}
        ref={(node) => {
          this.node = node;
        }}
      >
        {expanded && <Backdrop invisible onClick={onBackdropClick} />}

        <TransitionGroup className={classes.miniContainer}>
          {helper && expanded && (
            <Fade>
              <div className={classes.monster}>
                <Button
                  className={classes.mini}
                  color="primary"
                  fab
                  onClick={() => onMonsterAdd(true)}
                >
                  <EmoticonDevil />
                </Button>
              </div>
            </Fade>
          )}

          {helper && expanded && (
            <Fade enterDelay={50}>
              <div className={classes.helper}>
                <Button
                  className={classes.mini}
                  color="primary"
                  component={Link}
                  fab
                  to={`/player/${playerId}/combat/add/helper`}
                >
                  <SocialPersonAdd />
                </Button>
              </div>
            </Fade>
          )}
        </TransitionGroup>

        <Button
          className={classes.button}
          color="primary"
          fab
          onClick={this.handleClick}
        >
          {helper ? (
            <ContentAdd className={cns(classes.icon, { [classes.expanded]: expanded })} />
          ) : <EmoticonDevil />}
        </Button>

        <Route exact path="/player/:id/combat/add/helper">
          {({ match }) => (
            <HelperSelector open={!!match} />
          )}
        </Route>
      </div>
    );
  }
}

CombatHelperButton.propTypes = {
  classes: classesObject.isRequired,
  expanded: PropTypes.bool,
  helper: PropTypes.bool,
  onAdd: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

CombatHelperButton.defaultProps = {
  expanded: false,
  helper: false,
  onAdd: noop,
  onBackdropClick: noop,
  onMonsterAdd: noop,
};

export default withStyles(styles)(CombatHelperButton);
