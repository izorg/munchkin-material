import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Backdrop from 'material-ui/Modal/Backdrop';
import { withStyles } from 'material-ui/styles';
import transitions, { duration } from 'material-ui/styles/transitions';
import AddIcon from 'material-ui-icons/Add';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import cns from 'classnames';
import { noop } from 'lodash';

import EmoticonDevil from '../../../../components/icons/EmoticonDevil';

import Action from './Action';

const styles = (theme) => ({
  action: {
    marginBottom: theme.spacing.unit * 2,
  },

  backdrop: {
    backgroundColor: 'rgba(250, 250, 250, .9)',
  },

  container: {
    position: 'relative',
  },

  miniContainer: {
    bottom: 56,
    left: 8,
    position: 'absolute',
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
});

class CombatScreenHelperButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      expanded,
      helper,
      onAdd,
      onBackdropClick,
      onMonsterAdd,
      playerId,
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
      classes,
      expanded,
      helper,
      onBackdropClick,
      onMonsterAdd,
      playerId,
    } = this.props;

    const actionVisible = helper && expanded;

    return (
      <div className={classes.container}>
        {expanded && (
          <Backdrop
            classes={{
              root: classes.backdrop,
            }}
            onClick={onBackdropClick}
            open
          />
        )}

        <div className={classes.miniContainer}>
          <Action
            className={classes.action}
            in={actionVisible}
            onClick={() => onMonsterAdd(true)}
            title={
              <FormattedMessage
                id="combat.add.monster"
                defaultMessage="Monster"
              />
            }
          >
            <EmoticonDevil />
          </Action>
          <Action
            className={classes.action}
            component={Link}
            in={actionVisible}
            replace
            title={
              <FormattedMessage
                id="combat.add.helper"
                defaultMessage="Helper"
              />
            }
            to={`/player/${playerId}/combat/add/helper`}
          >
            <PersonAddIcon />
          </Action>
        </div>

        <Button
          className={classes.button}
          color="primary"
          onClick={this.handleClick}
          variant="fab"
        >
          {helper ? (
            <AddIcon
              className={cns(classes.icon, { [classes.expanded]: expanded })}
            />
          ) : (
            <EmoticonDevil />
          )}
        </Button>
      </div>
    );
  }
}

CombatScreenHelperButton.propTypes = {
  expanded: PropTypes.bool,
  helper: PropTypes.bool,
  onAdd: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  playerId: PropTypes.string.isRequired,
};

CombatScreenHelperButton.defaultProps = {
  expanded: false,
  helper: false,
  onAdd: noop,
  onBackdropClick: noop,
  onMonsterAdd: noop,
};

export default withStyles(styles)(CombatScreenHelperButton);
