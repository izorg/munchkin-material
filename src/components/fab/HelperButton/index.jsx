import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/es/Link';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Backdrop from 'material-ui/Modal/Backdrop';
import { withStyles } from 'material-ui/styles';
import transitions, { duration } from 'material-ui/styles/transitions';
import ContentAdd from 'material-ui-icons/Add';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import cns from 'classnames';

import { noop } from '../../../constants';
import { classesObject } from '../../../utils/propTypes';

import Fade from './Fade';
import EmoticonDevil from '../../icons/EmoticonDevil';
import HelperSelector from '../../../routes/Combat/HelperSelector';

const styles = {
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
    transition: transitions.create('transform', {
      duration: duration.shorter,
    }),
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

class FabHelperButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      expanded, helper, onAdd, onBackdropClick, onMonsterAdd, playerId,
    } = this.props;

    if (expanded) {
      onBackdropClick();
    } else if (helper) {
      onAdd(playerId);
    } else {
      onMonsterAdd();
    }
  }

  render() {
    const {
      classes, expanded, helper, onBackdropClick, onMonsterAdd, playerId,
    } = this.props;

    return (
      <div className={classes.container}>
        {expanded && <Backdrop invisible onClick={onBackdropClick} />}

        <TransitionGroup className={classes.miniContainer}>
          {helper && expanded && (
            <Fade>
              <div className={classes.monster}>
                <Tooltip
                  open
                  placement="left"
                  title={<FormattedMessage id="combat.add.monster" defaultMessage="Monster" />}
                >
                  <Button
                    className={classes.mini}
                    color="primary"
                    fab
                    onClick={() => onMonsterAdd(true)}
                  >
                    <EmoticonDevil />
                  </Button>
                </Tooltip>
              </div>
            </Fade>
          )}

          {helper && expanded && (
            <Fade>
              <div className={classes.helper}>
                <Tooltip
                  open
                  placement="left"
                  title={<FormattedMessage id="combat.add.helper" defaultMessage="Helper" />}
                >
                  <Button
                    className={classes.mini}
                    color="primary"
                    component={Link}
                    fab
                    to={`/player/${playerId}/combat/add/helper`}
                  >
                    <SocialPersonAdd />
                  </Button>
                </Tooltip>
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

        <HelperSelector />
      </div>
    );
  }
}

FabHelperButton.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  expanded: PropTypes.bool,
  helper: PropTypes.bool,
  onAdd: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  playerId: PropTypes.number.isRequired,
};

FabHelperButton.defaultProps = {
  expanded: false,
  helper: false,
  onAdd: noop,
  onBackdropClick: noop,
  onMonsterAdd: noop,
};

export default withStyles(styles)(FabHelperButton);
