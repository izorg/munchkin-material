import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import cns from 'classnames';
import { noop } from 'lodash';

import Fab from '../../../../components/Fab';
import EmoticonDevil from '../../../../components/icons/EmoticonDevil';

import Action from './Action';

const styles = (theme) => ({
  action: {
    marginBottom: theme.spacing.unit * 2,
  },

  backdrop: {
    backgroundColor: 'rgba(250, 250, 250, .9)',
    zIndex: 1,
  },

  container: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },

  miniContainer: {
    bottom: 56,
    left: 8,
    position: 'absolute',
  },

  button: {
    bottom: 0,
    left: 0,
    position: 'relative',
  },

  icon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    }),
  },

  expanded: {
    transform: 'rotate(45deg)',
  },
});

class CombatHelperButton extends PureComponent {
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
      className,
      expanded,
      helper,
      onAdd,
      onBackdropClick,
      onHelperClick,
      onMonsterAdd,
      playerId,
      ...rest
    } = this.props;

    const actionVisible = helper && expanded;

    return (
      <Fragment>
        <div className={cns(classes.container, className)} {...rest}>
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
              in={actionVisible}
              onClick={() => onHelperClick(playerId)}
              title={
                <FormattedMessage
                  id="combat.add.helper"
                  defaultMessage="Helper"
                />
              }
            >
              <PersonAddIcon />
            </Action>
          </div>

          <Fab
            className={classes.button}
            color={expanded ? 'default' : 'primary'}
            onClick={this.handleClick}
          >
            {helper ? (
              <AddIcon
                className={cns(classes.icon, { [classes.expanded]: expanded })}
              />
            ) : (
              <EmoticonDevil />
            )}
          </Fab>
        </div>

        {expanded && (
          <Backdrop
            classes={{
              root: classes.backdrop,
            }}
            onClick={onBackdropClick}
            open
          />
        )}
      </Fragment>
    );
  }
}

CombatHelperButton.propTypes = {
  expanded: PropTypes.bool,
  helper: PropTypes.bool,
  onAdd: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onHelperClick: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  playerId: PropTypes.string.isRequired,
};

CombatHelperButton.defaultProps = {
  expanded: false,
  helper: false,
  onAdd: noop,
  onBackdropClick: noop,
  onHelperClick: noop,
  onMonsterAdd: noop,
};

export default withStyles(styles)(CombatHelperButton);
